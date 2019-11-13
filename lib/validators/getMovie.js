'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  exactTitle: Joi.boolean().default(false),
  title: Joi.string().max(255).default(''),
  startYear: Joi.number().integer().min(1878),
  endYear: Joi.number().integer().max(9999),
  year: Joi.number().integer().min(1878).max(9999),
  exactLocation: Joi.boolean().default(false),
  location: Joi.string().max(255).default('')
}).oxor('startYear', 'year').oxor('endYear', 'year');
