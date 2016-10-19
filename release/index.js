/// <reference path="../typings/index.d.ts" />
'use strict';
var FileForwarderService_1 = require('./implementations/FileForwarderService');
var TextLogsWatcher_1 = require('./implementations/TextLogsWatcher');
var config_1 = require('./config');
var service = new FileForwarderService_1.FileForwarderService(new TextLogsWatcher_1.TextLogsWatcher({ path: config_1.config.directoryPath }));
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

//# sourceMappingURL=maps/index.js.map
