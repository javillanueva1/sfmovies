'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/location');

describe('location validator', () => {

  describe('locations', () => {

    it('is required', () => {
      const payload = { title: 'title', release_year: 1951 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('locations');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is an array', () => {
      const payload = { title: 'title', release_year: 1951, locations: 'San Francisco' };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('locations');
      expect(result.error.details[0].type).to.eql('array.base');
    });

    it('is an array with items', () => {
      const payload = { title: 'title', release_year: 1951, locations: [] };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('locations');
      expect(result.error.details[0].type).to.eql('array.includesRequiredUnknowns');
    });

    it('is an array of strings', () => {
      const payload = { title: 'title', release_year: 1951, locations: [1951] };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('locations');
      expect(result.error.details[0].type).to.eql('string.base');
    });

  });

});
