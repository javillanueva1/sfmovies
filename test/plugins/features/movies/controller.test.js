'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');

describe('movie controller', () => {

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
        const payload1 = { title: 'Mrs. Doubtfire', release_year: '1993' };
        const payload2 = { title: 'Mrs. Doubtfire 2: Electric Boogaloo', release_year: '2103' };

        await Controller.create(payload1);
        await Controller.create(payload2);
      });

      after(async () => {
        await Knex('movies').truncate();
      });

      it('filtered by start year', async () => {
        const request = { query: {
          startYear: 2100
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by end year', async () => {
        const request = { query: {
          endYear: 2000
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

      it('filtered by fuzzy search on the title', async () => {
        const request = { query: {
          exact: 'false',
          title: 'Electric'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire 2: Electric Boogaloo');
        expect(movies.models[0].get('release_year')).to.eql(2103);
      });

      it('filtered by exact search on the title', async () => {
        const request = { query: {
          exact: 'true',
          title: 'Mrs. Doubtfire'
        } };

        const movies = await Controller.get(request);

        expect(movies.models.length).to.eql(1);
        expect(movies.models[0].get('name')).to.eql('Mrs. Doubtfire');
        expect(movies.models[0].get('release_year')).to.eql(1993);
      });

    });

  });

});
