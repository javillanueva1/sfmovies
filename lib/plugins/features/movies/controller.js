'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await Movie.forge({ name: payload.title }).save(payload);

  return new Movie({ id: movie.id }).fetch();
};
