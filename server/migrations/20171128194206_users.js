exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password_diggest').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
