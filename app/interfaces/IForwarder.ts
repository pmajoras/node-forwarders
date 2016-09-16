'use strict';
import {IDisposable} from '../common/Common';
import {ILogMessage} from './ILogMessages';
import {Promise} from 'q';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {Array<ILogMessageContainer>} messages
   */
  forward(message: ILogMessage): Promise<any>;
}
