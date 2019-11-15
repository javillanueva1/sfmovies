'use strict';

const Joi = require('joi');

module.exports = {
  exact: Joi.boolean().default(false),
  title: Joi.string().min(1).max(255).default(''),
  startYear: Joi.number().min(1878).default(1878),
  endYear: Joi.number().max(9999).default(9999)
};
