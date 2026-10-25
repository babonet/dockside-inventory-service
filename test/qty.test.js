'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { reserve } = require('../src/inventory');

test('rejects zero-quantity reservations', () => {
  assert.throws(() => reserve('SKU-1001', 0), (err) => err.status === 400);
});
