// import jwt from 'jsonwebtoken';
// import argon2 from 'argon2';
// import * as EmailValidator from 'email-validator';

export const sign_in = async (data, device_info, ip) => {
  // const prisma = new PrismaClient();
  // const { input_prop } = data;
  // const { password, ...user } = await prisma.user.findFirst({
  //   where: { OR: [{ email: input_prop }, { login: input_prop }] },
  //   select: {
  //     last_name: true,
  //     first_name: true,
  //     login: true,
  //     email: true,
  //     id: true,
  //     password: true,
  //   },
  // });
  // if (!user) {
  //   throw { message: 'Такого пользователя не существует' };
  // }
  // const salt = Buffer.from(process.env.SALT);
  // const secret = Buffer.from(process.env.JWT_SECRET);
  // const access = await argon2.verify(password, data.password, {
  //   salt,
  // });
  // if (!access) throw { message: 'Нет доступа!' };
  // const access_token = `Bearer ${jwt.sign({ user }, secret, { expiresIn: '1m' })}`;
  // const refresh_token = jwt.sign({ user }, secret, { expiresIn: '2d' });
  // await prisma.session.updateMany({
  //   where: { user_id: user.id, device_info, is_used: false },
  //   data: { is_used: true },
  // });
  // await prisma.session.create({
  //   data: {
  //     access_token,
  //     refresh_token,
  //     user_id: user.id,
  //     device_info,
  //     ip,
  //   },
  // });
  // return { access_token, refresh_token, user };
};

export const sign_up = async (data) => {
  // const prisma = new PrismaClient();
  // const is_check_user = await prisma.user.count({ where: { OR: [{ email: data.email }, { login: data.login }] } });
  // if (is_check_user) throw { message: 'Такой email или login уже используется!' };
  // const salt = Buffer.from(process.env.SALT);
  // const is_check_pass = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*-_=]{8,32}$').test(data.password);
  // if (!is_check_pass) {
  //   throw { message: 'Пароль не соответствует стандартам. Длина 8-32 символа. Буквы латинского алфавита!' };
  // }
  // const is_check_email = EmailValidator.validate(data.email);
  // if (!is_check_email) {
  //   throw { message: 'E-mail не соответствует стандартам.' };
  // }
  // const password = await argon2.hash(data.password, { salt });
  // const user = await prisma.user.create({
  //   data: {
  //     email: data.email,
  //     login: data.login,
  //     password,
  //     first_name: data.first_name,
  //     middle_name: data.middle_name,
  //     last_name: data.last_name,
  //     avatar: data.avatar,
  //   },
  // });
  // return user;
};

export const sign_out = async (user_id, device_info) => {
  // const prisma = new PrismaClient();
  // await prisma.session.update({
  //   where: { user_id, is_used: false, device_info },
  //   data: { is_used: true },
  // });
  // return { message: 'ok' };
};
