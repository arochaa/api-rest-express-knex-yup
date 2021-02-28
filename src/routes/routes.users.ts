import { Router } from 'express';
import { hash } from 'bcryptjs';
import knex from '../database/connection';

const usersRoutes = Router();

usersRoutes.get('/', async (req, res) => {
  const users = await knex('users').select('*');
  return res.status(200).json(users);
});

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passw = await hash(password, 8);
    const user = {
      name,
      email,
      password: passw,
    };

    const newId = await knex('users').insert(user);
    return res.status(201).json({ id: newId[0], ...user });
  } catch (e) {
    return res.status(400).json({ msg: 'Error', level: '50', erro: e.message });
  }
});

export default usersRoutes;
