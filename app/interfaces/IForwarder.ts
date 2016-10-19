'use strict';
import { IDisposable } from '../common/Common';
import { ILogMessage } from './ILogMessages';
import { Promise } from 'q';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {Array<ILogMessage>} messages
   */
  forward(messages: Array<ILogMessage>): Promise<any>;
}
