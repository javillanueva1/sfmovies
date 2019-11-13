'use strict';

const Joi = require('@hapi/joi');

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

  describe('exactLocation', () => {

    it('defaults to false', () => {
      const query = {};
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.value.exactLocation).to.eql(false);
    });

    it('accepts true or false', () => {
      const query = { exactLocation: 'maybe' };
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

  describe('location', () => {

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

  describe('year', () => {

    it('is a number', () => {
      const query = { year: 'Hoopla' };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.base');
    });

    it('is an integer', () => {
      const query = { year: 1996.6 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.integer');
    });

    it('is after 1878', () => {
      const query = {  year: 1000 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is before 9999', () => {
      const query = { year: 99999 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('cannot be present alongside startYear', () => {
      const query = { year: 1950, startYear: 1952 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('object.oxor');
    });

    it('cannot be present alongside endYear', () => {
      const query = { year: 1950, endYear: 1952 };
      const result = Joi.validate(query, GetMovieValidator);

      expect(result.error.details[0].type).to.eql('object.oxor');
    });

  });

});
