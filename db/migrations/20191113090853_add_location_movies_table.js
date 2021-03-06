'use strict';

exports.up = async (knex) => {
  await knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.unique('name');
  });

  await knex.schema.createTable('locations_movies', (table) => {
    table.integer('movie_id');
    table.integer('location_id');
    table.foreign('movie_id').references('movies.id');
    table.foreign('location_id').references('locations.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('locations_movies');
  await knex.schema.dropTable('location');
};
