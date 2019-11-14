'use strict';

const Controller        = require('./controller');
const MovieValidator    = require('../../../validators/movie');
const MovieGetValidator = require('../../../validators/getMovie');
const LocationValidator = require('../../../validators/location');

exports.register = (server, options, next) => {
  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  }]);

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.get(request));
      },
      validate: {
        query: MovieGetValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.updateLocations(request));
      },
      validate: {
        payload: LocationValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      handler: (request, reply) => {
        reply(Controller.updateLocations(request));
      },
      validate: {
        payload: LocationValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
