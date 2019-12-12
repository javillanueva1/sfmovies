'use strict';

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');
const Knex     = require('../../../libraries/knex');
const Bluebird = require('bluebird');
const Util     = require('util');

exports.create = async (payload) => {

  const name = payload.title;
  const locations = payload.locations;

  Reflect.deleteProperty(payload, 'title');
  Reflect.deleteProperty(payload, 'locations');

  const movie = await Movie.forge({ name }).save(payload);

  Bluebird.map(locations, async (location) => {
    let locationId;
    try {
      locationId = await new Location({ name: location }).fetch({ require: false });
      locationId = locationId ? locationId : await Location.forge({ name: location }).save();
    } catch (error) {
      throw error;
    }
    await movie.belongsToMany(Location).attach(locationId);
  }).catch((error) => {
    Util.log(error);
  });

  const returnedMovie = await new Movie({ id: movie.id }).fetch();
  returnedMovie.attributes.locations = locations;

  return returnedMovie;
};

exports.get = async (request) => {
  const params = request.query;

  return await new Movie().query((builder) => {
    builder.select('movies.*', Knex.raw('json_agg(locations.name) locations')).from('movies');
    builder.innerJoin('locations_movies', 'movies.id', 'locations_movies.movie_id');
    builder.innerJoin('locations', 'locations.id', 'locations_movies.location_id');

    //Building Where Clause
    const titleMatcher = params.exactTitle ? '=' : 'LIKE';

    let title;

    if (titleMatcher === '=') {
      title = params.title;
    } else {
      title = `%${params.title}%`;
    }

    if (params.year) {
      builder.where('release_year', '=', params.year);
    }
    if (params.startYear) {
      builder.where('release_year', '>=', params.startYear);
    }
    if (params.endYear) {
      builder.where('release_year', '<=', params.endYear);
    }

    builder.where('movies.name', titleMatcher, title);

    if (params.location) {
      const locationMatcher = params.exactLocation ? '=' : 'LIKE';

      let location;

      if (locationMatcher === '=') {
        location = params.location;
      } else {
        location = `%${params.location}%`;
      }

      builder.where('locations.name', locationMatcher, location);
    }

    builder.groupBy('movies.id', 'movies.name', 'movies.release_year');

  })
  .fetchAll();
};

exports.updateLocations = async (request) => {
  const movieId = request.params.id;

  let locationId;

  try {
    locationId = await new Location({ name: request.payload.location }).fetch({ require: true });
  } catch (error) {
    locationId = await Location.forge({ name: request.payload.location }).save();
  }

  await new Movie({ id: movieId }).belongsToMany(Location).attach(locationId);

  return await new Movie().query((builder) => {
    builder.select('movies.*', Knex.raw('json_agg(locations.name) locations')).from('movies')
    .leftJoin('locations_movies', 'movies.id', 'locations_movies.movie_id')
    .leftJoin('locations', 'locations.id', 'locations_movies.location_id')
    .where('movies.id', '=', movieId)
    .groupBy('movies.id', 'movies.name', 'movies.release_year');
  }).fetch();
};
