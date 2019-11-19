'use strict';

const movies = 'movies';
const name_constraint = 'movies_name_not_null';

exports.up = async (knex) => {
  await knex.schema.table('movies', (table) => {
    table.dropColumn('title');
  });

  await knex.raw(`ALTER TABLE ${movies} ADD CONSTRAINT ${name_constraint} CHECK (name IS NOT NULL) NOT VALID`);
  await knex.raw(`ALTER TABLE ${movies} VALIDATE CONSTRAINT ${name_constraint}`);
};

exports.down = async (knex) => {
  await knex.schema.table('movies', (table) => {
    table.text('title');
  });

  await knex.raw(`ALTER TABLE ${movies} DROP CONSTRAINT ${name_constraint}`);
};
