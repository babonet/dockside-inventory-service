'use strict';

const LOW_STOCK_THRESHOLD = 10;

const stock = new Map([
  ['SKU-1001', 120],
  ['SKU-2002', 8],
  ['SKU-3003', 0],
]);

function clientError(status, message) {
  return Object.assign(new Error(message), { status });
}

function getStock(sku) {
  if (!stock.has(sku)) throw clientError(404, `unknown sku ${sku}`);
  return { sku, available: stock.get(sku) };
}

function reserve(sku, qty) {
  const { available } = getStock(sku);
  if (!(qty > 0)) throw clientError(400, 'qty must be positive');
  if (qty > available) throw clientError(409, `insufficient stock for ${sku}`);
  stock.set(sku, available - qty);
  return { sku, reserved: qty, remaining: available - qty };
}

module.exports = { getStock, reserve, LOW_STOCK_THRESHOLD };
