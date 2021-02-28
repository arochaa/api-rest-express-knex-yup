import Knex from 'knex';
import { hash } from 'bcryptjs';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex) {
  await knex('users').insert({
    name: 'admin',
    email: 'admin@gmail.com',
    password: await hash('admin', 8),
  });
}
