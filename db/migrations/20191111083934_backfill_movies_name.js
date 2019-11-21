'use strict';

exports.up = (knex) => {
  return knex.raw('UPDATE movies SET name = title');
};

exports.down = () => {
  return Promise.resolve();
};
