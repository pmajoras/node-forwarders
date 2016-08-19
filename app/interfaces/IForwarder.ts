'use strict';
import {IDisposable} from '../common/Common';
import {ILogMessage} from './ILogMessage';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {Array<ILogMessage>} messages
   */
  forward(messages: Array<ILogMessage>): void;
}
