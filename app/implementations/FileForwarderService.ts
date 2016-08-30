'use strict';
import {FSWatcher} from 'fs';
import {IForwarderService} from '../interfaces/IForwarderService';
import {ITextLogsWatcher} from '../interfaces/ITextLogsWatcher';
import {ILogMessageContainer} from '../interfaces/ILogMessages';
import {HttpForwarder} from './HttpForwarder';

export class FileForwarderService extends HttpForwarder implements IForwarderService {
  constructor(watcher: ITextLogsWatcher) {
    super();
    if (watcher === null) {
      throw new Error('The watcher is required.');
    }

    this.isDisposed = false;
    this.watcher = watcher;
  }

  private watcher: ITextLogsWatcher;
  private isDisposed: boolean;
  private handleNewMessages = (err: NodeJS.ErrnoException, messagesContainer: Array<ILogMessageContainer>) => {
    if (err) {
      console.log('handleNewMessages > err', err);
    } else {
      this.forward(messagesContainer)
        .then((result) => {
          console.log('forwardResult', result);
        })
        .catch((err) => {
          console.log('forwardError', err);
        });
    }
  }

  onInit() {
    this.watcher.addNewMessagesListener(this.handleNewMessages);
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
