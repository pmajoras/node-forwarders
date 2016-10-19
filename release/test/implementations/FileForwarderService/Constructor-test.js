/// <reference path="../../../../typings/index.d.ts" />
"use strict";
var FileForwarderService_1 = require('../../../implementations/FileForwarderService');
var chai_1 = require('chai');
var TextLogsWatcher_1 = require('../../../implementations/TextLogsWatcher');
describe('FileForwarderService - Constructor', function () {
    var target;
    var textLogWatcher = new TextLogsWatcher_1.TextLogsWatcher({ path: 'path' });
    beforeEach(function () {
        target = null;
    });
    it('should throw exception', function () {
        var fn = function () { return new FileForwarderService_1.FileForwarderService(null); };
        chai_1.expect(fn).to.throw(Error);
    });
    it('should not throw exeption and set watcher property', function () {
        var target = new FileForwarderService_1.FileForwarderService(textLogWatcher);
    });
});

//# sourceMappingURL=../../../maps/test/implementations/FileForwarderService/Constructor-test.js.map
