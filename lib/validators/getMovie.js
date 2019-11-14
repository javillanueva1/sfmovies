'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  exactTitle: Joi.boolean().default(false),
  exactYear: Joi.boolean().default(false),
  exactLocation: Joi.boolean().default(false),
  title: Joi.string().min(1).max(255).default(''),
  startYear: Joi.number().integer().min(1878).default(1878),
  endYear: Joi.number().integer().max(9999).default(9999),
  locations: Joi.string().max(255).default(''),
  year: Joi.when(Joi.ref('exactYear'), {
    is: Joi.boolean().valid(true).required(),
    then: Joi.number().integer().min(1878).max(9999).required(),
    otherwise: Joi.any()
  })
});
