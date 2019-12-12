'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');
const Sinon      = require('sinon');
const Location   = require('../../../../lib/models/location');
const Util       = require('util');

describe('movie controller', () => {

  after(async () => {
    await Knex('locations_movies').del();
    await Knex('movies').del();
    await Knex('locations').del();
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'WALL-E', locations: ['San Francisco'] };

      const movie = await Controller.create(payload);

      expect(movie.attributes.name).to.eql('WALL-E');
    });

    it('throws an error', async () => {
      const UtilLogSpy = Sinon.spy(Util, 'log');
      const stub = Sinon.stub(Location.prototype, 'fetch').returns(Promise.reject('SomeError'));

      const payload = { title: 'WALL-E', locations: ['San Francisco'] };

      await Controller.create(payload);

      expect(UtilLogSpy.calledOnce).to.be.true;
      stub.restore();
      Util.log.restore();
    });

  });

  describe('get', () => {

    describe('retrieves all matching movies', () => {

      before(async () => {
        const payload1 = { title: 'Mrs. Doubtfire', release_year: '1993', locations: ['San Bruno'] };
        const payload2 = { title: 'Mrs. Doubtfire 2: Electric Boogaloo', release_year: '2103', locations: ['San Diego'] };

        await Controller.create(payload1);
        await Controller.create(payload2);
      });

      it('filtered by start year', async () => {
        const request = { query: {
          exactTitle: false,
          title: '',
          startYear: 2100,
          endYear: 9999
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by end year', async () => {
        const request = { query: {
          exactTitle: false,
          title: '',
          startYear: 1878,
          endYear: 2000
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

      it('filtered by fuzzy search on the title', async () => {
        const request = { query: {
          exactTitle: false,
          title: 'Electric',
          startYear: 1878,
          endYear: 9999
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by exact search on the title', async () => {
        const request = { query: {
          exactTitle: true,
          title: 'Mrs. Doubtfire',
          startYear: 1878,
          endYear: 9999
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

      it('filtered by exact search on the year', async () => {
        const request = { query: {
          exactTitle: false,
          title: 'Mrs. Doubtfire',
          year: 1993
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

      it('filtered by fuzzy search on the location', async () => {
        const request = { query: {
          exactLocation: false,
          exactTitle: false,
          title: '',
          location: 'Die'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by exact search on the location', async () => {
        const request = { query: {
          exactLocation: true,
          exactTitle: false,
          title: '',
          location: 'San Bruno'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

    });

  });

  describe('updateLocation', () => {

    it('updates a movie location', async () => {
      const payload = { title: 'WALL-E', locations: ['Space'] };

      const movie = await Controller.create(payload);

      expect(movie.attributes.name).to.eql('WALL-E');
      expect(movie.attributes.locations).to.eql(['Space']);

      const request = {
        params: {
          id: movie.id
        },
        payload: {
          location: 'Earth'
        }
      };

      const updatedMovie = await Controller.updateLocations(request);

      expect(updatedMovie.attributes.name).to.eql('WALL-E');
      expect(updatedMovie.attributes.locations).to.eql(['Space', 'Earth']);
    });

  });

});
