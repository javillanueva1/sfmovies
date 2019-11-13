'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object().keys({
  location: Joi.string().min(1).max(255).required()
});
