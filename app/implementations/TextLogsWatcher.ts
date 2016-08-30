'use strict';
import {FSWatcher, readFile, rename} from 'fs';
import {dirname, basename} from 'path';
import * as mkdirp from 'mkdirp';
import {ITextLogsWatcher} from '../interfaces/ITextLogsWatcher';
import {EventEmitter} from 'events';
import * as Q from 'q';
import * as chokidar from 'chokidar';
import {ILogMessageContainer} from '../interfaces/ILogMessages';

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
      .on('change', this.onFileChanged);
    this.processTimer = setInterval(this.process, 1000 * 10);
  }

  private processTimer: NodeJS.Timer;
  private filesToRead: Array<string> = [];
  private watcher: FSWatcher;
  private isDisposed: boolean;

  private process = () => {
    console.log('process');

    this.processFiles(this.filesToRead)
      .then((messagesContainers) => {
        console.log('messagesContainers', messagesContainers);
        if (messagesContainers && messagesContainers.length > 0) {
          this.emit(events.newMessage, null, messagesContainers);
        }
      });
  }

  // TODO: Improve performance and create a class for this method.
  private processFiles = (filesPaths: Array<string>): Q.IPromise<any> => {
    let deffered = Q.defer();

    if (Array.isArray(filesPaths) && filesPaths.length > 0) {
      let currentFileIndex = 0;
      let promiseResult: Array<ILogMessageContainer> = [];

      let handleFileReadRecursive = (err, content) => {
        let fileResult = {
          messages: [],
          filePath: filesPaths[currentFileIndex]
        };

        if (err) {
          console.log('err', err);
        } else {

          content.toString().split('\n').forEach((value) => {
            fileResult.messages.push({ message: value });
          });
          promiseResult.push(fileResult);

          let newDirectoryName = dirname(fileResult.filePath) + '/processed/';
          let newFilePath = dirname(fileResult.filePath) + '/processed/' + basename(fileResult.filePath);
          mkdirp(newDirectoryName, () => {
            rename(fileResult.filePath, newFilePath, (err) => {
              console.log('removed', err);
            });
          });
        }

        currentFileIndex++;

        if (filesPaths.length > currentFileIndex) {
          readFile(filesPaths[currentFileIndex], handleFileReadRecursive);
        } else {
          promiseResult.forEach((logMessageContainer) => {
            var index = this.filesToRead.indexOf(logMessageContainer.filePath);
            if (index !== -1) {
              this.filesToRead.splice(index, 1);
            }
          });
          deffered.resolve(promiseResult);
        }
      };

      readFile(filesPaths[0], handleFileReadRecursive);
    } else {
      return Q.resolve([]);
    }

    return deffered.promise;
  }

  addNewMessagesListener(listener: Function) {
    this.addListener(events.newMessage, listener);
  }

  removeNewMessagesListener(listener: Function) {
    this.removeListener(events.newMessage, listener);
  }

  onFileAdded = (path: string) => {
    if (this.filesToRead.indexOf(path) === -1) {
      this.filesToRead.push(path);
    }
    console.log('onFileAdded', this.filesToRead);
  }

  onFileChanged = (path: string) => {
    if (this.filesToRead.indexOf(path) === -1) {
      this.filesToRead.push(path);
    }
    console.log('onFileChanged', this.filesToRead);
  }

  dispose() {
    if (!this.isDisposed) {
      this.removeAllListeners();

      if (this.watcher !== null) {
        this.watcher.close();
      }

      if (this.processTimer !== null) {
        this.processTimer.unref();
      }
    }
  }
}
