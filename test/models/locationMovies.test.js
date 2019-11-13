'use strict';

const LocationMovies = require('../../lib/models/locationsMovies');

describe('locationsMovies model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const locationsMovies = LocationMovies.forge().serialize();

      expect(locationsMovies).to.have.all.keys([
        'location_id',
        'movie_id',
        'object'
      ]);
    });

  });

});
