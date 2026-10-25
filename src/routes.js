'use strict';

const { getStock, reserve } = require('./inventory');
const pkg = require('../package.json');

const routes = [
  {
    method: 'GET',
    match: (path) => {
      const m = path.match(/^\/inventory\/([\w-]+)$/);
      return m ? { sku: m[1] } : null;
    },
    handler: async ({ params }) => ({ status: 200, body: getStock(params.sku.toUpperCase()) }),
  },
  {
    method: 'POST',
    match: (path) => (path === '/inventory/reserve' ? {} : null),
    handler: async ({ body }) => ({ status: 200, body: reserve(String(body.sku || '').toUpperCase(), body.qty) }),
  },
];

module.exports = { service: pkg.name, version: pkg.version, routes };
