'use strict';

exports.up = (knex) => {
  return knex.raw('UPDATE movies SET name = title');
};

exports.down = (knex, Promise) => {
  return Promise.resolve();
};
