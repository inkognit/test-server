import { UserModel } from '../db/user.entity.js';

class UserService {
  constructor() {
    // this.userModel = new UserSchema;
  }

  async getUsers(query) {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id) {
    const user = await UserModel.findById(id);
    if (!user) throw { message: 'User not found', code: 404 };
    return user;
  }

  async putUser({ id, ...data }) {
    const isCheck = await UserModel.findById(id);
    if (!isCheck) throw { message: 'По данному идентификатору ничего не найдено' };
    if (data.email) {
      throw { message: 'email менять нельзя' };
    }
    const user = await UserModel.updateOne({ _id: id }, data);
    return user;
  }

  async deleteUser(id) {
    // const is_check = await this.prisma.user.count({ where: { id } });
    // if (!is_check) throw { message: 'По данному идентификатору ничего не найдено' };
    // const user = await this.prisma.user.delete({ where: { id } });
    // return user;
  }
}

export default UserService;
