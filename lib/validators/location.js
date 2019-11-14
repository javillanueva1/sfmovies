'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  locations: Joi.array().min(1).items(Joi.string().min(1).max(255).required()).required()
});
