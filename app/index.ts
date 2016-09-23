/// <reference path="../typings/index.d.ts" />
'use strict';
import * as chokidar from 'chokidar';
import { FileForwarderService } from './implementations/FileForwarderService';
import { TextLogsWatcher } from './implementations/TextLogsWatcher';
import { config } from './config';

var service = new FileForwarderService(new TextLogsWatcher({ path: config.directoryPath }));
service.onInit();

function exitHandler(options, err) {

  if (options.cleanup) {
    service.dispose();
  }
  if (err) {
    console.log('exitHandler >> ', err.stack);
  }
  if (options.exit) {
    process.exit();
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
