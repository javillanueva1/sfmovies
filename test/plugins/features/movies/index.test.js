'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

describe('movies integration', () => {

  beforeEach(async () => {
    await Knex('movies').truncate();
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql('Volver');
    });

  });

  describe('get', () => {

    it('retrieves movies', async () => {
      const response1 = await Movies.inject({
        url: '/movies',
        method: 'GET'
      });

      expect(response1.statusCode).to.eql(200);
    });

  });

});
