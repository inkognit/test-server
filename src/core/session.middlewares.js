import jwt from 'jsonwebtoken';
import { device_info } from './get-device-info.util.js';

export const session = async (req, res, next) => {
  //   let prisma = new PrismaClient();
  let access_token = req.headers['authorization'];

  const secret = Buffer.from(process.env.JWT_SECRET);
  if (!access_token || !access_token.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Access Denied. No token provided.' });
  }

  try {
    const { user } = jwt.verify(access_token.substring(7), secret);
    req.session = user;
    next();
  } catch (error) {
    if (error.name !== 'TokenExpiredError') {
      //   await prisma.session.update({ where: { user_id: user.id, is_used: false }, data: { is_used: true } });
      return res.status(400).send({ message: 'Invalid Token.' });
    }
    let { user } = jwt.decode(access_token.substring(7), secret);
    try {
      //   const { refresh_token } = await prisma.session.findFirst({
      // where: { user_id: user.id, device_info: device_info(req.headers['user-agent']), is_used: false },
      //   });

      jwt.verify(refresh_token, secret);
      access_token = `Bearer ${jwt.sign({ user }, secret, { expiresIn: '15m' })}`;
      req.session = user;

      res
        .cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite: 'strict' })
        .header('authorization', access_token);
      return next();
    } catch (error) {
      let where = { user_id: user.id, is_used: false };
      if (error.name === 'TokenExpiredError') {
        where['device_info'] = device_info(req.headers['user-agent']);
      }
      //   await prisma.session.updateMany({
      //     where,
      //     data: { is_used: true },
      //   });
      res.statusMessage = 'Invalid Token.';
      return res.status(400).send('Invalid Token.');
    }
  }
};
