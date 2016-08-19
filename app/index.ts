/// <reference path="../typings/index.d.ts" />
'use strict';
import * as chokidar from 'chokidar';
import { FileForwarderService } from './implementations/FileForwarderService';
import { TextLogsWatcher } from './implementations/TextLogsWatcher';

var service = new FileForwarderService(new TextLogsWatcher({path: 'C:/ProjetosGit/node-forwarders/test-directory/*.txt'}));
service.onInit();
console.log('test333');

