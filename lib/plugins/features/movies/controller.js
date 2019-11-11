'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const name = payload.title;
  Reflect.deleteProperty(payload, 'title');

  const movie = await Movie.forge({ name }).save(payload);

  return new Movie({ id: movie.id }).fetch();
};
