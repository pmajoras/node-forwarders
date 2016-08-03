/// <reference path="../typings/index.d.ts" />
'use strict';
var chokidar = require('chokidar');
var FileForwarderService_1 = require('./implementations/FileForwarderService');
var service = new FileForwarderService_1.FileForwarderService(chokidar.watch('C:/ProjetosGit/node-forwarders/test-directory/*.txt', {}));
console.log('test333');
