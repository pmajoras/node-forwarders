'use strict';
import {IDisposable} from './IDisposable';

/**
 * Using statement.
 * @template T
 * @param {T} resource
 * @param {(resource: T) => void} func
 */
export function using<T extends IDisposable>(resource: T, func: (resource: T) => void) {
  try {
    func(resource);
    resource.dispose();
  } catch (ex) {
    if (resource !== null) {
      resource.dispose();
    }
    throw ex;
  }
};
