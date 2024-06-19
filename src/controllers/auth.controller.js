import ipware from 'ipware';
import { device_info } from '../core/get-device-info.util.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {

  async signIn(req, res) {
    try {
      const { body } = req;
      const authSevice = new AuthService();
      const { clientIp } = ipware().get_ip(req);
      const data = await authSevice.signIn(body, device_info(req.headers['user-agent']), clientIp);
      return res
        .cookie('accessToken', data.accessToken, { httpOnly: true, sameSite: 'strict', secure: true })
        .send(data);
    } catch (error) {
      res.send({ message: error.message || error });
    }
  }

  async signUp(req, res) {
    try {
      const { body } = req;
      const authSevice = new AuthService();
      const data = await authSevice.signUp(body);
      return res.send( data );
    } catch (error) {
      res.send({ message: error.message || error });
    }
  }

  async signOut(req, res) {
    try {
      const authSevice = new AuthService();
      const { id: user_id } = req.session;
      const result = await authSevice.signOut(user_id, device_info(req.headers['user-agent']));
      return res.send({ ...result });
    } catch (error) {
      res.send({ message: error.message || error });
    }
  }
}
