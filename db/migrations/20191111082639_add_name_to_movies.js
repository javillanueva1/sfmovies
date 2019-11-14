'use strict';

exports.up = async (knex) => {
  await knex.schema.table('movies', (table) => {
    table.text('name');
  });
  await knex.raw('ALTER TABLE movies ALTER COLUMN title DROP NOT NULL');
};

exports.down = async (knex) => {
  await knex.schema.table('movies', (table) => {
    table.dropColumn('name');
  });
  await knex.raw('ALTER TABLE movies ALTER COLUMN title SET NOT NULL');
};
