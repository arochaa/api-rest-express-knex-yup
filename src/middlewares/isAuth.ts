import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  isAuth: (req: Request, res: Response, next: NextFunction) => {
    try {
      const autHeader = req.headers.authorization;

      if (!autHeader) {
        throw new Error('JWT Token is missing');
      }

      const [, token] = autHeader.split(' ');
      const decodedToken = verify(token, authConfig.jwt.secret);

      return next();
    } catch (e) {
      return res
        .status(400)
        .json({ msg: 'Error', level: '50', erro: e.message });
    }
  },
};
