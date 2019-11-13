'use strict';

const Joi = require('@hapi/joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 character', ()  => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = { title: 'title', release_year: 0 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = { title: 'title', release_year: 99999 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is an integer', () => {
      const payload = { title: 'title', release_year: 1996.6 };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.integer');
    });

  });

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
