'use strict';

exports.up = (knex) => {
  return knex.raw('UPDATE movies SET locations = \'{San Francisco}\'');
};

exports.down = (knex, Promise) => {
  return Promise.resolve();
};
