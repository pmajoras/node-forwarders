/// <reference path="../typings/index.d.ts" />
'use strict';
import * as chokidar from 'chokidar';
import { FileForwarderService } from './implementations/FileForwarderService';
var service = new FileForwarderService(chokidar.watch('C:/ProjetosGit/node-forwarders/test-directory/*.txt', {}));
console.log('test333');

