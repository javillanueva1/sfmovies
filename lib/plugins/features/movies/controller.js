'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const name = payload.title;
  Reflect.deleteProperty(payload, 'title');

  const movie = await Movie.forge({ name }).save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.get = async (request) => {
  const params = request.query;

  return await new Movie().query((builder) => {
    const titleMatcher = params.exact ? '=' : 'LIKE';
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

    builder.where('name', titleMatcher, title);
  })
  .fetchAll();
};
