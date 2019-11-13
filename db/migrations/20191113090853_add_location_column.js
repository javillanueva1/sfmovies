'use strict'

exports.up = async (knex) => {
  await knex.raw('ALTER TABLE movies ADD COLUMN locations text[]');
};

exports.down = async (knex) => {
  await knex.schema.table('movies', (table) => {
    table.dropColumn('locations');
  });
};
