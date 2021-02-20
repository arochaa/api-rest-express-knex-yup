import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up(Knex: knex) {
  return Knex.schema.createTable('locations', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('latitude').notNullable();
    table.string('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf').notNullable();
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down(Knex: knex) {
  return Knex.schema.dropTable('locations');
}
