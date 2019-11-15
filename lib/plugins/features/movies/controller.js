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
    const matcher = params.exact === 'true' ? '=' : 'LIKE';

    let title;

    if (matcher === '=') {
      title = params.title;
    } else {
      title = `%${params.title}%`;
    }

    builder
    .where('release_year', '>=', params.startYear)
    .andWhere('release_year', '<=', params.endYear)
    .andWhere('name', matcher, title);
  })
  .fetchAll();
};
