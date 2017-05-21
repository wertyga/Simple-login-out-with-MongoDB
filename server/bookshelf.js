import bookshelf from 'bookshelf';
import knex from 'knex';
import knexConfig from '../knexfile';

export default bookshelf(knex(knexConfig.staging));