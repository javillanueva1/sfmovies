'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');

describe('movie controller', () => {

  before(async () => {
    await Knex('movies').truncate();
  });

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'WALL-E' };

      const movie = await Controller.create(payload);

      expect(movie.get('title')).to.eql(payload.title);

      await Knex('movies').truncate();
    });

  });

  describe('get', () => {

    describe('retrieves all matching movies', () => {

      before(async () => {
        const payload1 = { title: 'Mrs. Doubtfire', release_year: '1993', locations: ['San Francisco'] };
        const payload2 = { title: 'Mrs. Doubtfire 2: Electric Boogaloo', release_year: '2103', locations: ['San Diego'] };

        await Controller.create(payload1);
        await Controller.create(payload2);
      });

      it('filtered by start year', async () => {
        const request = { query: {
          exact: false,
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
          exact: false,
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
          startYear: 1878,
          endYear: 9999,
          exactTitle: 'false',
          title: 'Electric'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by exact search on the title', async () => {
        const request = { query: {
          exactTitle: 'true',
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
          exactTitle: 'false',
          exactYear: 'true',
          title: 'Mrs. Doubtfire',
          startYear: 1878,
          endYear: 9999,
          year: 1993
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

      it('filtered by fuzzy search on the location', async () => {
        const request = { query: {
          exactLocation: 'false',
          exactTitle: 'false',
          title: '',
          startYear: 1878,
          endYear: 9999,
          location: 'Die'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by exact search on the location', async () => {
        const request = { query: {
          exactLocation: 'true',
          exactTitle: 'false',
          title: '',
          startYear: 1878,
          endYear: 9999,
          location: 'San Francisco'
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

      expect(movie.get('title')).to.eql(payload.title);
      expect(movie.get('locations')).to.eql(payload.locations);

      const request = {
        params: {
          id: movie.id
        },
        payload: {
          locations: ['Earth']
        }
      };

      const updatedMovie = await Controller.updateLocations(request);

      expect(updatedMovie.get('title')).to.eql(payload.title);
      expect(updatedMovie.get('locations')).to.eql(payload.locations.concat(request.payload.locations));

      await Knex('movies').truncate();
    });
    
  });

});
