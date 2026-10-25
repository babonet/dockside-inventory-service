'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { getStock, reserve } = require('../src/inventory');

test('returns stock for a known SKU', () => {
  assert.deepEqual(getStock('SKU-1001'), { sku: 'SKU-1001', available: 120 });
});

test('rejects an unknown SKU with 404', () => {
  assert.throws(() => getStock('SKU-9999'), (err) => err.status === 404);
});

test('reserving stock reduces availability', () => {
  const result = reserve('SKU-2002', 3);
  assert.equal(result.remaining, 5);
});

test('rejects a reservation larger than available stock', () => {
  assert.throws(() => reserve('SKU-3003', 1), (err) => err.status === 409);
});
