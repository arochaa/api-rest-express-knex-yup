import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up(Knex: knex) {
  return Knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('image').notNullable();
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down(Knex: knex) {
  return Knex.schema.dropTable('items');
}
