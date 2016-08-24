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
  private handleNewMessages = (err: NodeJS.ErrnoException, messagesContainer: ILogMessageContainer) => {
    if (!err) {
      this.watcher.removeNewMessagesListener(this.handleNewMessages);

      this.forward(messagesContainer)
        .then((response) => {
          this.watcher.addNewMessagesListener(this.handleNewMessages);
        })
        .catch((err) => {
          this.watcher.addNewMessagesListener(this.handleNewMessages);
        });
    } else {
      console.log('handleNewMessages > err', err);
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
