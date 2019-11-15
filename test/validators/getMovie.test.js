'use strict';

const Joi = require('joi');

const GetMovieValidator = require('../../lib/validators/getMovie');

describe('get movie validator', () => {

  describe('exact', () => {

    it('defaults to false', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.exact).to.eql(false);
    });

    it('accepts true or false', () => {
      const query = { exact: 'maybe' };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('boolean.base');
    });

  });

  describe('title', () => {

    it('defaults to empty string', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.title).to.eql('');
    });

    it('must be shorter than 255 characters', () => {
      const query = { title: 'a'.repeat(256) };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('startYear', () => {

    it('defaults to 1878', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.startYear).to.eql(1878);
    });

    it('must be after 1878', () => {
      const query = { startYear: 1000 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.min');
    });

  });

  describe('endYear', () => {

    it('defaults to 9999', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.endYear).to.eql(9999);
    });

    it('must be before 9999', () => {
      const query = { endYear: 99999 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
