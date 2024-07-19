import argon2 from 'argon2';
import * as EmailValidator from 'email-validator';
import jwt from 'jsonwebtoken';
import { SessionModel } from '../db/session.entity.js';
import { UserModel } from '../db/user.entity.js';

export class AuthService {
  async signIn(data, deviceInfo, ip) {
    const { email } = data;
    const { password, ...user } = await UserModel.findOne({ email }).select('name email password').lean();
    if (!password) throw { message: 'User not found', code: 404 };
    const salt = Buffer.from(process.env.SALT);
    const secret = Buffer.from(process.env.JWT_SECRET);
    const access = await argon2.verify(password, data.password, {
      salt,
    });
    if (!access) throw { message: 'Нет доступа!' };
    const accessToken = `Bearer ${jwt.sign({ user }, secret, { expiresIn: '1m' })}`;
    const refreshToken = jwt.sign({ user }, secret, { expiresIn: '2d' });
    await SessionModel.updateMany(
      {
        $and: [{ userId: user._id }, { deviceInfo }, { isUsed: false }],
      },
      {
        isUsed: true,
      },
    );

    const newSession = new SessionModel({ accessToken, refreshToken, userId: user._id, deviceInfo, ip });
    await newSession.save();
    return { accessToken, refreshToken, user };
  }

  async signUp(data) {
    console.log('🚀 ~ Auth ~ signUp ~ data.email:', data.email);
    const isExistUser = await UserModel.findOne({ email: data.email });
    if (isExistUser) throw { message: 'Такой email или login уже используется!' };
    const salt = Buffer.from(process.env.SALT); // TODO добавить аппарат генерирования персональной соли для повышения безопасности 
    const isCheckPassword = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*-_=]{8,32}$').test(data.password);
    if (!isCheckPassword) {
      throw { message: 'Пароль не соответствует стандартам. Длина 8-32 символа. Буквы латинского алфавита!' };
    }
    const isCheckEmail = EmailValidator.validate(data.email);
    if (!isCheckEmail) {
      throw { message: 'E-mail не соответствует стандартам.' };
    }
    const password = await argon2.hash(data.password, { salt });
    const user = new UserModel({
      email: data.email,
      avatar: data.avatar,
      password,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      login: data.login,
      birthday: data.birthday,
    });
    await user.save();
    return { message: 'ok' };
  }

  async signOut(userId, deviceInfo) {
    await SessionModel.updateOne({ $and: [{ userId }, { isUsed: false }, { deviceInfo }] }, { isUsed: true });
    return { message: 'ok' };
  }
}
