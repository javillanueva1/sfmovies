'use strict';

const Joi = require('joi');

const GetMovieValidator = require('../../lib/validators/getMovie');

describe('get movie validator', () => {

  describe('exactTitle', () => {

    it('defaults to false', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.exactTitle).to.eql(false);
    });

    it('accepts true or false', () => {
      const query = { exactTitle: 'maybe' };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('boolean.base');
    });

  });

  describe('exactYear', () => {

    it('defaults to false', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.exactYear).to.eql(false);
    });

    it('accepts true or false', () => {
      const query = { exactYear: 'maybe' };
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

    it('is shorter than 255 characters', () => {
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

    it('is after 1878', () => {
      const query = { startYear: 1000 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is an integer', () => {
      const query = { endYear: 1996.6 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.integer');
    });

  });

  describe('endYear', () => {

    it('defaults to 9999', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.endYear).to.eql(9999);
    });

    it('is before 9999', () => {
      const query = { endYear: 99999 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is an integer', () => {
      const query = { endYear: 1996.6 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.integer');
    });

  });

  describe('year', () => {

    it('is a number', () => {
      const query = { exactYear: true, year: 'Hoopla' };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.base');
    });

    it('is an integer', () => {
      const query = { exactYear: true, year: 1996.6 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.integer');
    });

    it('is after 1878', () => {
      const query = { exactYear: true,  year: 1000 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is before 9999', () => {
      const query = { exactYear: true, year: 99999 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is required if exactYear is true', () => {
      const query = { exactYear: true };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is optional if exactYear is false', () => {
      const query = { exactYear: false };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error).to.be.null;
    });

  });

});
