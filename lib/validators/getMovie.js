'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  exact: Joi.boolean().default(false),
  title: Joi.string().max(255).default(''),
  startYear: Joi.number().integer().min(1878),
  endYear: Joi.number().integer().max(9999),
  year: Joi.number().integer().min(1878).max(9999)
}).oxor('startYear', 'year').oxor('endYear', 'year');
