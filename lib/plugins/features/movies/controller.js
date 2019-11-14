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
    const titleMatcher = params.exactTitle === 'true' ? '=' : 'LIKE';

    let title;

    if (titleMatcher === '=') {
      title = params.title;
    } else {
      title = `%${params.title}%`;
    }

    const locationMatcher = params.exactLocation === 'true' ? '=' : 'LIKE';

    let location;

    if (locationMatcher === '=') {
      location = params.location;
    } else {
      location = `%${params.location ? params.location : ''}%`;
    }

    if (params.exactYear) {
      builder.where('release_year', '=', params.year);
    } else {
      builder
      .where('release_year', '>=', params.startYear)
      .where('release_year', '<=', params.endYear);
    }
    builder
    .where('name', titleMatcher, title)
    .whereRaw(`EXISTS (SELECT FROM unnest(locations) location WHERE location ${locationMatcher} '${location}')`);
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
