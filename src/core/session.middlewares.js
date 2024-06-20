import jwt from 'jsonwebtoken';
import { SessionModel } from '../db/session.entity.js';
import { device_info } from './get-device-info.util.js';

export const session = async (req, res, next) => {
  let accessToken = req.headers['authorization'];

  const secret = Buffer.from(process.env.JWT_SECRET);
  if (!accessToken || !accessToken.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Access Denied. No token provided.' });
  }

  try {
    const { user } = jwt.verify(accessToken.substring(7), secret);
    req.session = user;
    next();
  } catch (error) {
    if (error.name !== 'TokenExpiredError') {
      await SessionModel.updateOne({ userId: user._id, isUsed: false }, { isUsed: true });
      return res.status(400).send({ message: 'Invalid Token.' });
    }
    let { user } = jwt.decode(accessToken.substring(7), secret);
    try {
      const { refreshToken } = await SessionModel.findOne({
        userId: user._id,
        deviceInfo: device_info(req.headers['user-agent']),
        isUsed: false,
      });

      jwt.verify(refreshToken, secret);
      accessToken = `Bearer ${jwt.sign({ user }, secret, { expiresIn: '15m' })}`;
      req.session = user;

      res
        .cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' })
        .header('authorization', accessToken);
      return next();
    } catch (error) {
      let where = { userId: user._id, isUsed: false };
      if (error.name === 'TokenExpiredError') {
        where['device_info'] = device_info(req.headers['user-agent']);
      }
      await SessionModel.updateMany(where, { isUsed: true });
      res.statusMessage = 'Invalid Token.';
      return res.status(400).send('Invalid Token.');
    }
  }
};
