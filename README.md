# safe-async-fn

Lightweight wrapper to make async functions safer.

## Install

```sh
npm install safe-async-fn
```

## Usage

```js
const safeAsyncFn = require("safe-async-fn");

async function unsafeFn() {
  // May throw synchronously, return a value, or return a rejected promise.
  // Works for sync function too!
}

const safeFn = safeAsyncFn(unsafeFn);

const [err, res] = await safeFn(); // This call will not fail
```

## API

### `safeAsyncFn(asyncFn)`

Wraps the provided function and returns a new one, to safely capture errors.

- Returns a new `saferFn`.

#### `asyncFn`

Type: `function`  
The async function to make safer to call.

### `saferFn(...args)`

This function wraps the original `asyncFn` and will pass through the received parameters to it.

- If `asyncFn` succeeds, returns `Promise<[null, asyncFnResult]>`.
- If `asyncFn` throws synchronously or rejects, returns `Promise<[err, null]>`.
