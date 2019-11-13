'use strict';

exports.up = async (knex) => {
  await knex('locations').insert({ name: 'San Francisco' });
  await knex('locations_movies').insert(function () {
    this.from('movies')
    .crossJoin('locations')
    .select(knex.raw('movies.id as movie_id, locations.id as location_id'))
    .where('locations.name', '=', 'San Francisco');
  });
};

exports.down = async (knex) => {
  await knex('locations').where('name', '=', 'San Francisco').delete();
  await knex('locations_movies').truncate();
};
