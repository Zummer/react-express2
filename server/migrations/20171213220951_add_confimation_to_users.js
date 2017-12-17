exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.boolean('confirmed').notNullable().defaultTo(false);
    table.string('confirmationToken');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumns('confirmed', 'confirmationToken');
  });
};
