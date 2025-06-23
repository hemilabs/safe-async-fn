/**
 * Wraps an async function to capture all error modes making the call safe.
 *
 * @template T - The return type
 * @template E - The error type (defaults to Error)
 * @param asyncFn The async function to wrap
 * @returns A function that returns a Promise of either [null, result] or [error, null]
 */
declare function safeAsyncFn<T = any, E = Error>(
  asyncFn: (...args: any[]) => T | Promise<T>,
): (...args: any[]) => Promise<[E | null, T | null]>;

export = safeAsyncFn;
