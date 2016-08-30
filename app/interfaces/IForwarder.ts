'use strict';
import {IDisposable} from '../common/Common';
import {ILogMessageContainer} from './ILogMessages';
import {Promise} from 'q';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {Array<ILogMessageContainer>} messages
   */
  forward(messageContainer: Array<ILogMessageContainer>): Promise<any>;
}
