'use strict';
var FileForwarderService = (function () {
    function FileForwarderService(watcher) {
        if (watcher === null) {
            throw new Error('The watcher is required.');
        }
        this.isDisposed = false;
        this.watcher = watcher;
        this.watcher.on('all', function (event, path) {
            console.log(event, path);
        });
    }
    /**
     *
     * @param {string} content
     */
    FileForwarderService.prototype.forward = function (content) {
        console.log('forward');
    };
    FileForwarderService.prototype.onInit = function () {
        console.log('onInit');
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
                this.watcher.close();
                this.watcher = null;
            }
        }
    };
    return FileForwarderService;
}());
exports.FileForwarderService = FileForwarderService;
