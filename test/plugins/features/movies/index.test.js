'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

describe('movies integration', () => {

  after(async () => {
    await Knex('locations_movies').del();
    await Knex('movies').del();
  });

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
      expect(response.result.locations).to.eql(['San Francisco']);
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
        payload: { title: 'Volver', release_year: 1956, locations: ['San Francisco'] }
      });
      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql('Volver');
      expect(response.result.locations).to.eql(['San Francisco']);

      const updatedResponse = await Movies.inject({
        url: `/movies/${response.result.id}/locations`,
        method: 'POST',
        payload: { location: 'San Fernando' }
      });

      expect(updatedResponse.statusCode).to.eql(200);
      expect(updatedResponse.result.object).to.eql('movie');
      expect(updatedResponse.result.title).to.eql('Volver');
      expect(updatedResponse.result.locations).to.eql(['San Francisco', 'San Fernando']);
    });

  });

});
