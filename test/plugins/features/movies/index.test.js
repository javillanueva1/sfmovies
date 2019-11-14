'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver', locations: ['San Francisco'] }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql('Volver');

      await Knex.truncate('movies');
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

  describe('update', () => {

    it('updates movie locations', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver', locations: ['San Francisco'] }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql('Volver');
      expect(response.result.locations).to.eql(['San Francisco']);

      const updatedResponse = await Movies.inject({
        url: `/movies/${response.result.id}/locations`,
        method: 'POST',
        payload: { locations: ['San Fernando'] }
      });
      expect(updatedResponse.statusCode).to.eql(200);
      expect(updatedResponse.result.object).to.eql('movie');
      expect(updatedResponse.result.title).to.eql('Volver');
      expect(updatedResponse.result.locations).to.eql(['San Francisco', 'San Fernando']);

      await Knex.truncate('movies');
    });

  });

});
