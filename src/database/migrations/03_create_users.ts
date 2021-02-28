import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up(Knex: knex) {
  return Knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down(Knex: knex) {
  return Knex.schema.dropTable('users');
}
