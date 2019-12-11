'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  title: Joi.string().min(1).max(255).required(),
  release_year: Joi.number().integer().min(1878).max(9999).optional(),
  locations: Joi.array().min(1).items(Joi.string().min(1).max(255).required()).optional()
});
