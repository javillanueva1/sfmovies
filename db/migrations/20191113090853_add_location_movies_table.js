'use strict';

exports.up = async (knex) => {
  await knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.unique('name');
  });

  await knex.schema.createTable('location_movies', (table) => {
    table.integer('movie_id');
    table.integer('location_id');
    table.foreign('movie_id').references('movies.id').onDelete('CASCADE');
    table.foreign('location_id').references('locations.id').onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('location_movies');
  await knex.schema.dropTable('location');
};
