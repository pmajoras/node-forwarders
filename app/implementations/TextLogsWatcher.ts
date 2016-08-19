'use strict';
import {FSWatcher, readFile} from 'fs';
import {ITextLogsWatcher} from '../interfaces/ITextLogsWatcher';
import {EventEmitter} from 'events';
import * as chokidar from 'chokidar';

const events = {
  newMessage: 'NEW_MESSAGE'
};

interface ITextLogConfig {
  path: string;
}

export class TextLogsWatcher extends EventEmitter implements ITextLogsWatcher {
  constructor(config: ITextLogConfig) {
    super();

    this.watcher = chokidar.watch(config.path, {});
    this.watcher
      .on('add', this.onFileAdded)
      .on('change', this.onFileChanged)
      .on('unlink', this.onFileRemoved);
  }

  private watcher: FSWatcher;
  private isDisposed: boolean;
  private handleFileRead = (err: NodeJS.ErrnoException, content: Buffer) => {
    var messages = content.toString().split('\n').map((value) => { return { message: value }; });
    this.emit(events.newMessage, err, messages);
  }

  addNewMessagesListener(listener: Function) {
    this.addListener(events.newMessage, listener);
  }
  removeNewMessagesListener(listener: Function) {
    this.addListener(events.newMessage, listener);
  }

  onFileAdded = (path: string) => {
    readFile(path, this.handleFileRead);
  }

  onFileChanged = (path: string) => {
    readFile(path, this.handleFileRead);
  }

  onFileRemoved = (path: string) => {
    console.log('onFileRemoved >> path');
  }

  dispose() {
    if (!this.isDisposed) {
      this.removeAllListeners();
      if (this.watcher !== null) {
        this.watcher.close();
      }
    }
  }
}
