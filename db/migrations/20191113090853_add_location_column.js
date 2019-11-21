'use strict';

exports.up = async (knex) => {
  await knex.schema.createTable('locations', (table) => {
    table.increments('location_id').primary();
    table.text('location');
  });

  await knex.schema.createTable('location_movies', (table) => {
    table.integer('movie_id');
    table.integer('location_id');
    table.foreign('movie_id').references('movies.id');
    table.foreign('location_id').references('locations.location_id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('location_movies');
  await knex.schema.dropTable('location');
};
