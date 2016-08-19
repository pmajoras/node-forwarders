'use strict';
import {FSWatcher} from 'fs';
import {IForwarderService} from '../interfaces/IForwarderService';
import {ITextLogsWatcher} from '../interfaces/ITextLogsWatcher';
import {ILogMessage} from '../interfaces/ILogMessage';

export class FileForwarderService implements IForwarderService {
  constructor(watcher: ITextLogsWatcher) {
    if (watcher === null) {
      throw new Error('The watcher is required.');
    }

    this.isDisposed = false;
    this.watcher = watcher;
  }

  private watcher: ITextLogsWatcher;
  private isDisposed: boolean;
  private handleWatcherNewMessages = (err: NodeJS.ErrnoException, messages: Array<ILogMessage>) => {
    if (!err) {
      this.forward(messages);
    } else {
      console.log('handleWatcherNewMessages > err', err);
    }
  }

  /**
   *
   * @param {string} messages
   */
  forward = (messages: Array<ILogMessage>) => {
    this.onForwardStart();
    console.log('messages', messages);
  }

  onInit() {
    this.watcher.addNewMessagesListener(this.handleWatcherNewMessages);
  }

  onFinish() {
    console.log('onFinish');
  }

  onForwardError() {
    console.log('onForwardError');
  }

  onForwardSuccess() {
    console.log('onForwardSuccess');
  }

  onForwardStart() {
    console.log('onForwardStart');
  }

  dispose() {
    if (!this.isDisposed) {
      this.onFinish();
      if (this.watcher !== null) {
        this.watcher.dispose();
      }
    }
  }
}
