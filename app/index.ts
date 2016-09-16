/// <reference path="../typings/index.d.ts" />
'use strict';
import * as chokidar from 'chokidar';
import { FileForwarderService } from './implementations/FileForwarderService';
import { TextLogsWatcher } from './implementations/TextLogsWatcher';
import { config } from './config';

var service = new FileForwarderService(new TextLogsWatcher({path: config.directoryPath}));
service.onInit();

