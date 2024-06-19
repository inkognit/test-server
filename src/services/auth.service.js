import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { SessionModel } from '../db/session.entity.js';
import { UserModel } from '../db/user.entity.js';

export class Auth {
  async signIn(data, deviceInfo, ip) {
    const { email } = data;
    const { password, ...user } = await UserModel.findOne({ $where: { email } });
    if (!password) throw { message: 'User not found', code: 404 };
    const salt = Buffer.from(process.env.SALT);
    const secret = Buffer.from(process.env.JWT_SECRET);
    const access = await argon2.verify(password, data.password, {
      salt,
    });
    if (!access) throw { message: 'Нет доступа!' };
    const access_token = `Bearer ${jwt.sign({ user }, secret, { expiresIn: '1m' })}`;
    const refresh_token = jwt.sign({ user }, secret, { expiresIn: '2d' });
    await SessionModel.updateMany(
      {
        $and: [{ userId: user._id }, { deviceInfo }, { isUsed: false }],
      },
      {
        isUsed: true,
      },
    );

    const newSession = new SessionModel({ accessToken, refreshToken, userId, deviceInfo, ip });
    await newSession.save();
    return { access_token, refresh_token, user };
  }

  async signUp(data) {
    const isExistUser = await UserModel.findOne({ $where: { email: data.email } });
    if (isExistUser) throw { message: 'Такой email или login уже используется!' };
    const salt = Buffer.from(process.env.SALT);
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
      name: data.name,
    });
    await user.save();
    return { message: 'ok' };
  }

  async signOut(userId, deviceInfo) {
    await SessionModel.updateOne({ $and: [{ userId }, { isUsed: false }, { deviceInfo }] }, { isUsed: true });
    return { message: 'ok' };
  }
}
