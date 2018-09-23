exports.up = function(knex, Promise) {

  // ADMIN CAN CREATE ITEMS FOR CLIENTS
  return Promise.all([
    knex.schema.createTable('items', (table, Promise) => {
      table.increments('item_id').primary();
      table.string('admin_id').notNullable;
      table.string('item_name').notNullable;
      table.string('item_description');
      table.decimal('item_price').notNullable;
      table.string('item_photo_URL').notNullable;
    })
  ])

};

exports.down = function(knex, Promise) {
   knex.schema.dropTable('items');
};
