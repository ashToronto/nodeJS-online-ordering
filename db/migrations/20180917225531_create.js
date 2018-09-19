exports.up = function(knex, Promise) {

  // CREATES ADMIN TABLE
  return Promise.all([
    knex.schema.createTable('owner', (table, Promise) => {
      table.increments('id').primary()
      table.string('username').notNullable;
      table.string('email').notNullable;
      table.string('password').notNullable;
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owner');
};
