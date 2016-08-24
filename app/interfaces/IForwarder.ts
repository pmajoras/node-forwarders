'use strict';
import {IDisposable} from '../common/Common';
import {ILogMessageContainer} from './ILogMessages';

export interface IForwarder extends IDisposable {
  /**
   *
   * @param {Array<ILogMessage>} messages
   */
  forward(messageContainer: ILogMessageContainer): Promise<any>;
}
