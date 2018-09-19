exports.up = function(knex, Promise) {

  // ADMIN CAN CREATE ITEMS FOR CLIENTS
  return Promise.all([
    knex.schema.createTable('items', (table, Promise) => {
      table.increments('item_id').primary();
      table.string('name').notNullable;
      table.string('description');
      table.decimal('price').notNullable;
      table.string('photo_URL').notNullable;
    })
  ])

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
