'use strict';
import {FSWatcher} from 'fs';
import {IForwarderService} from '../interfaces/IForwarderService';
import {ITextLogsWatcher} from '../interfaces/ITextLogsWatcher';
import {ILogMessageContainer, ILogMessage} from '../interfaces/ILogMessages';
import {HttpForwarder} from './HttpForwarder';
import {config} from '../config';

export class FileForwarderService extends HttpForwarder implements IForwarderService {
  constructor(watcher: ITextLogsWatcher) {
    super({ url: config.processorUrl, appId: config.appId });
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

      let messages: ILogMessage[] = [];
      messagesContainer.forEach((messageContainer) => {
        messageContainer.messages.forEach((message) => {
          messages.push(message);
        });
      });
      console.log('handleNewMessages > ', messagesContainer);
      messages.forEach((message) => {
        this.forward(message)
          .then((result) => {
            console.log('forwardResult message', message, 'result', result);
          })
          .catch((err) => {
            console.log('forwardError message', message, 'err', err);
          });
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
