import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';
import authConfig from '../config/auth';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new Error(`Credentials not found`);
    }

    const comparePass = await compare(password, user.password);

    if (!comparePass) {
      throw new Error(`Credentials not found`);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    const result = {
      id: user.id,
      email: user.email,
      token,
    };

    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ msg: 'Error', level: '50', erro: e.message });
  }
});

export default sessionsRoutes;
