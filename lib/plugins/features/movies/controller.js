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
      title = `%${params.title ? params.title : ''}%`;
    }

    builder
    .where('release_year', '>', params.startYear ? params.startYear : '1878')
    .andWhere('release_year', '<', params.endYear ? params.endYear :  '9999')
    .andWhere('name', matcher, title);
  })
  .fetchAll();
};

exports.updateLocations = async (request) => {
  const id = request.params.id;

  const movie = await new Movie({ id }).fetch();

  return await Movie.forge({ locations: movie.attributes.locations.concat(request.payload.locations) })
  .where('id', '=', id)
  .save(null, { method: 'update' });
};
