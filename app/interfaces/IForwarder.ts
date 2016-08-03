'use strict';
import {IDisposable} from '../common/Common';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {string} content
   */
  forward(content: string): void;
}
