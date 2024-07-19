import { UserModel } from '../db/user.entity.js';

class UserService {
  async getUsers(query) {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id) {
    const user = await UserModel.findById(id).lean();
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
    // const user = await UserModel.findById(id).lean();
    // if (!user) throw { message: 'User not found', code: 404 }; // протестировать и далить лишнее после определения эффективности
    await UserModel.findByIdAndDelete({ _id: id });
    return { message: 'ok' };
  }
}

export default UserService;
