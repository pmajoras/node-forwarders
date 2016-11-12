'use strict';
import { FSWatcher, readFile, rename, writeFileSync, readFileSync, createReadStream } from 'fs';
import * as readline from 'readline';
import { dirname, basename } from 'path';
import * as mkdirp from 'mkdirp';
import { ITextLogsWatcher } from '../interfaces/ITextLogsWatcher';
import { EventEmitter } from 'events';
import * as Q from 'q';
import * as chokidar from 'chokidar';
import { ILogMessageContainer } from '../interfaces/ILogMessages';
import { config } from '../config';

const filesReadJsonPath = config.filesToReadObjectPath;
const processLoopInSeconds = config.processCicle;
const events = {
  newMessage: 'NEW_MESSAGE'
};

interface ITextLogConfig {
  path: string;
}

export class TextLogsWatcher extends EventEmitter implements ITextLogsWatcher {
  constructor(config: ITextLogConfig) {
    super();

    try {
      let filesToReadString = readFileSync(filesReadJsonPath, 'utf8');
      this.filesToRead = JSON.parse(filesToReadString);
      console.log('parsed filestoRead', this.filesToRead);
      if (!Array.isArray(this.filesToRead)) {
        this.filesToRead = [];
      }
    } catch (err) {
      console.log('filesReadJsonPath >> err', err);
      // Here you get the error when the file was not found,
      // but you also get any other error
    }

    this.watcher = chokidar.watch(config.path, {});
    this.watcher
      .on('add', this.onFileAdded)
      .on('change', this.onFileChanged);
    this.processTimer = setInterval(this.process, 1000 * processLoopInSeconds);
  }

  private isProcessing: Boolean;
  private processTimer: NodeJS.Timer;
  private filesToRead: Array<any> = [];
  private watcher: FSWatcher;
  private isDisposed: boolean;

  private process = () => {
    console.log('process');
    if (!this.isProcessing) {
      this.isProcessing = true;

      this.processFiles(this.filesToRead.filter((file) => file.hasChanges))
        .then((messagesContainers) => {
          console.log('messagesContainers', messagesContainers);
          if (messagesContainers && messagesContainers.length > 0) {
            writeFileSync(filesReadJsonPath, JSON.stringify(this.filesToRead));
            this.emit(events.newMessage, null, messagesContainers);
          }
          this.isProcessing = false;
        });
    }
  }

  // TODO: Improve performance and create a class for this method.
  private processFiles = (filesPaths: Array<any>): Q.IPromise<any> => {
    let deffered = Q.defer();

    if (Array.isArray(filesPaths) && filesPaths.length > 0) {
      let currentFileIndex = 0;
      let currentFileObject = filesPaths[currentFileIndex];
      let promiseResult: Array<ILogMessageContainer> = [];

      let readFileRecursive = (filePathObject) => {
        let currentLine = 0;
        let fileResult = {
          messages: [],
          filePath: filePathObject.path
        };
        let readLineInterface = readline.createInterface({
          input: createReadStream(filePathObject.path),
          output: process.stdout,
          terminal: false
        });

        readLineInterface.on('line', (input) => {
          console.log('line', input);
          if (currentLine >= filePathObject.line) {
            console.log('readedLine', input);
            fileResult.messages.push({ message: input });
          }
          currentLine++;
        });

        readLineInterface.on('close', () => {
          filePathObject.line = currentLine;
          filePathObject.hasChanges = false;
          promiseResult.push(fileResult);
          currentFileIndex++;

          if (filesPaths.length > currentFileIndex) {
            readFileRecursive(filesPaths[currentFileIndex]);
          } else {
            deffered.resolve(promiseResult);
          }
        });
      };

      readFileRecursive(currentFileObject);
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
    let index = this.filesToRead.findIndex((fileObject) => fileObject.path === path);
    if (index === -1) {
      this.filesToRead.push({ line: 0, path: path, hasChanges: true });
    } else {
      this.filesToRead[index].hasChanges = true;
    }
    console.log('onFileAdded', this.filesToRead);
  }

  onFileChanged = (path: string) => {
    let index = this.filesToRead.findIndex((fileObject) => fileObject.path === path);
    if (index === -1) {
      this.filesToRead.push({ line: 0, path: path, hasChanges: true });
    } else {
      this.filesToRead[index].hasChanges = true;
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
