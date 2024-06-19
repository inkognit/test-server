import { UserModel } from '../db/user.entity.js';

class UserService {
  constructor() {
    // this.userModel = new UserSchema;
  }

  async get_users(query) {
    const users = await UserModel.find();
    return users;
  }

  async get_user(id) {
    const user = await UserModel.findById(id);
    if (!user) throw { message: 'User not found', code: 404 };
    return user;
  }

  async put_user(data) {
    // const is_check = await this.prisma.user.count({ where: { id: data.id } });
    // if (!is_check) throw { message: 'По данному идентификатору ничего не найдено' };
    // if (data.email) {
    //   const is_check_email = await this.prisma.user.count({ where: { email: data.email } });
    //   if (is_check_email) throw { message: 'Данный email уже используется' };
    // }
    // const user = await this.prisma.user.update({
    //   where: { id: data.id },
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //   },
    // });
    // return user;
  }

  async delete_user(id) {
    // const is_check = await this.prisma.user.count({ where: { id } });
    // if (!is_check) throw { message: 'По данному идентификатору ничего не найдено' };
    // const user = await this.prisma.user.delete({ where: { id } });
    // return user;
  }
}

export default UserService;
