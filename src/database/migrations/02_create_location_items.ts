import knex from 'knex';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function up(Knex: knex) {
  return Knex.schema.createTable('location_items', table => {
    table.increments('id').primary();
    table
      .integer('location_id')
      .notNullable()
      .references('id')
      .inTable('locations');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function down(Knex: knex) {
  return Knex.schema.dropTable('location_items');
}
