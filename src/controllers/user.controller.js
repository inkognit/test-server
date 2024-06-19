import UserService from '../services/user.service.js';

export default class UserController {
  async getUsers(req, res) {
    try {
      const { query } = req;
      const user_service = new UserService();
      const resp = await user_service.getUsers(query);
      return res.send(resp);
    } catch (error) {
      return res.send({ message: error.message ? error.message : error });
    }
  }

  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user_service = new UserService();
      const resp = await user_service.getUser(id);
      return res.send(resp);
    } catch (error) {
      return res.send({ message: error.message ? error.message : error });
    }
  }

  async putUser(req, res) {
    try {
      const id = req.params.id;
      const { body } = req;
      const user_service = new UserService();
      const resp = await user_service.putUser({ ...body, id });
      return res.send(resp);
    } catch (error) {
      return res.send({ message: error.message ? error.message : error });
    }
  }
}
