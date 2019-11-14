'use strict';

exports.up = function (knex) {
  return knex.raw('ALTER TABLE movies ADD CONSTRAINT movies_locations_not_null CHECK (locations IS NOT NULL) NOT VALID')
  .then(() => {
    return knex.raw('ALTER TABLE movies VALIDATE CONSTRAINT movies_locations_not_null');
  });
};

exports.down = function (knex) {
  return knex.raw('ALTER TABLE movies DROP CONSTRAINT movies_name_not_null');
};
