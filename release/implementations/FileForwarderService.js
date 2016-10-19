'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HttpForwarder_1 = require('./HttpForwarder');
var config_1 = require('../config');
var FileForwarderService = (function (_super) {
    __extends(FileForwarderService, _super);
    function FileForwarderService(watcher) {
        var _this = this;
        _super.call(this, { url: config_1.config.processorUrl, appId: config_1.config.appId });
        this.handleNewMessages = function (err, messagesContainer) {
            if (err) {
                console.log('handleNewMessages > err', err);
            }
            else {
                var messages_1 = [];
                messagesContainer.forEach(function (messageContainer) {
                    messageContainer.messages.forEach(function (message) {
                        messages_1.push(message);
                    });
                });
                if (messages_1.length > 0) {
                    _this.forward(messages_1)
                        .then(function (result) {
                        console.log('forwardResult message', 'result', result);
                    })
                        .catch(function (err) {
                        console.log('forwardError message', 'err', err);
                    });
                }
            }
        };
        if (watcher === null) {
            throw new Error('The watcher is required.');
        }
        this.isDisposed = false;
        this.watcher = watcher;
    }
    FileForwarderService.prototype.onInit = function () {
        this.watcher.addNewMessagesListener(this.handleNewMessages);
    };
    FileForwarderService.prototype.onFinish = function () {
        console.log('onFinish');
    };
    FileForwarderService.prototype.onForwardError = function () {
        console.log('onForwardError');
    };
    FileForwarderService.prototype.onForwardSuccess = function () {
        console.log('onForwardSuccess');
    };
    FileForwarderService.prototype.onForwardStart = function () {
        console.log('onForwardStart');
    };
    FileForwarderService.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.onFinish();
            if (this.watcher !== null) {
                this.watcher.dispose();
            }
        }
    };
    return FileForwarderService;
}(HttpForwarder_1.HttpForwarder));
exports.FileForwarderService = FileForwarderService;

//# sourceMappingURL=../maps/implementations/FileForwarderService.js.map
