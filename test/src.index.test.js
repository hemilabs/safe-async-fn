"use strict";

const { test } = require("node:test");
const assert = require("node:assert").strict;

const safeAsyncFn = require("..");

test("should return [null, result] when async function resolves", async function () {
  const asyncFn = async (x) => x * 2;
  const safeFn = safeAsyncFn(asyncFn);
  const [err, result] = await safeFn(5);
  assert.equal(err, null);
  assert.equal(result, 10);
});

test("should return [error, null] when async function rejects", async function () {
  const asyncFn = async function () {
    throw new Error("fail");
  };
  const safeFn = safeAsyncFn(asyncFn);
  const [err, result] = await safeFn();
  assert(err instanceof Error);
  assert.equal(err.message, "fail");
  assert.equal(result, null);
});

test("should return [null, result] when sync function returns", async function () {
  const syncFn = (a, b) => a + b;
  const safeFn = safeAsyncFn(syncFn);
  const [err, result] = await safeFn(2, 3);
  assert.equal(err, null);
  assert.equal(result, 5);
});

test("should return [error, null] when sync function throws", async function () {
  const syncFn = function () {
    throw new TypeError("bad");
  };
  const safeFn = safeAsyncFn(syncFn);
  const [err, result] = await safeFn();
  assert(err instanceof TypeError);
  assert.equal(err.message, "bad");
  assert.equal(result, null);
});
