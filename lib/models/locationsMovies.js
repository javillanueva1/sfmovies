'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'locations_movies',
  serialize: function () {
    return {
      location_id: this.get('location_id'),
      movie_id: this.get('movie_id'),
      object: 'locations_movies'
    };
  }
});
