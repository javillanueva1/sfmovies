'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/location');

describe('location validator', () => {

  describe('location', () => {

    it('is required', () => {
      const payload = { title: 'title', release_year: 1951 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is a string', () => {
      const payload = { title: 'title', release_year: 1951, location: 64127 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('string.base');
    });

    it('is not an empty string', () => {
      const payload = { title: 'title', release_year: 1951, location: '' };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

    it('is shorter than 255 characters', () => {
      const payload = { title: 'title', release_year: 1951, location: 'a'.repeat(256) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('location');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

});
