'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs_1 = require('fs');
var readline = require('readline');
var events_1 = require('events');
var Q = require('q');
var chokidar = require('chokidar');
var config_1 = require('../config');
var filesReadJsonPath = config_1.config.filesToReadObjectPath;
var processLoopInSeconds = config_1.config.processTimeout;
var events = {
    newMessage: 'NEW_MESSAGE'
};
var TextLogsWatcher = (function (_super) {
    __extends(TextLogsWatcher, _super);
    function TextLogsWatcher(config) {
        var _this = this;
        _super.call(this);
        this.filesToRead = [];
        this.process = function () {
            console.log('process');
            if (!_this.isProcessing) {
                _this.isProcessing = true;
                _this.processFiles(_this.filesToRead.filter(function (file) { return file.hasChanges; }))
                    .then(function (messagesContainers) {
                    console.log('messagesContainers', messagesContainers);
                    if (messagesContainers && messagesContainers.length > 0) {
                        fs_1.writeFileSync(filesReadJsonPath, JSON.stringify(_this.filesToRead));
                        _this.emit(events.newMessage, null, messagesContainers);
                    }
                    _this.isProcessing = false;
                });
            }
        };
        // TODO: Improve performance and create a class for this method.
        this.processFiles = function (filesPaths) {
            var deffered = Q.defer();
            if (Array.isArray(filesPaths) && filesPaths.length > 0) {
                var currentFileIndex_1 = 0;
                var currentFileObject = filesPaths[currentFileIndex_1];
                var promiseResult_1 = [];
                var readFileRecursive_1 = function (filePathObject) {
                    var currentLine = 0;
                    var fileResult = {
                        messages: [],
                        filePath: filePathObject.path
                    };
                    var readLineInterface = readline.createInterface({
                        input: fs_1.createReadStream(filePathObject.path),
                        output: process.stdout,
                        terminal: false
                    });
                    readLineInterface.on('line', function (input) {
                        console.log('line', input);
                        if (currentLine >= filePathObject.line) {
                            console.log('readedLine', input);
                            fileResult.messages.push({ message: input });
                        }
                        currentLine++;
                    });
                    readLineInterface.on('close', function () {
                        filePathObject.line = currentLine;
                        filePathObject.hasChanges = false;
                        promiseResult_1.push(fileResult);
                        currentFileIndex_1++;
                        if (filesPaths.length > currentFileIndex_1) {
                            readFileRecursive_1(filesPaths[currentFileIndex_1]);
                        }
                        else {
                            deffered.resolve(promiseResult_1);
                        }
                    });
                };
                readFileRecursive_1(currentFileObject);
            }
            else {
                return Q.resolve([]);
            }
            return deffered.promise;
        };
        this.onFileAdded = function (path) {
            var index = _this.filesToRead.findIndex(function (fileObject) { return fileObject.path === path; });
            if (index === -1) {
                _this.filesToRead.push({ line: 0, path: path, hasChanges: true });
            }
            else {
                _this.filesToRead[index].hasChanges = true;
            }
            console.log('onFileAdded', _this.filesToRead);
        };
        this.onFileChanged = function (path) {
            var index = _this.filesToRead.findIndex(function (fileObject) { return fileObject.path === path; });
            if (index === -1) {
                _this.filesToRead.push({ line: 0, path: path, hasChanges: true });
            }
            else {
                _this.filesToRead[index].hasChanges = true;
            }
            console.log('onFileChanged', _this.filesToRead);
        };
        try {
            var filesToReadString = fs_1.readFileSync(filesReadJsonPath, 'utf8');
            this.filesToRead = JSON.parse(filesToReadString);
            console.log('parsed filestoRead', this.filesToRead);
            if (!Array.isArray(this.filesToRead)) {
                this.filesToRead = [];
            }
        }
        catch (err) {
            console.log('filesReadJsonPath >> err', err);
        }
        this.watcher = chokidar.watch(config.path, {});
        this.watcher
            .on('add', this.onFileAdded)
            .on('change', this.onFileChanged);
        this.processTimer = setInterval(this.process, 1000 * processLoopInSeconds);
    }
    TextLogsWatcher.prototype.addNewMessagesListener = function (listener) {
        this.addListener(events.newMessage, listener);
    };
    TextLogsWatcher.prototype.removeNewMessagesListener = function (listener) {
        this.removeListener(events.newMessage, listener);
    };
    TextLogsWatcher.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.removeAllListeners();
            if (this.watcher !== null) {
                this.watcher.close();
            }
            if (this.processTimer !== null) {
                this.processTimer.unref();
            }
        }
    };
    return TextLogsWatcher;
}(events_1.EventEmitter));
exports.TextLogsWatcher = TextLogsWatcher;

//# sourceMappingURL=../maps/implementations/TextLogsWatcher.js.map
