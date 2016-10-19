'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stream_1 = require('stream');
var LogTransformStream = (function (_super) {
    __extends(LogTransformStream, _super);
    function LogTransformStream(options) {
        _super.call(this, options);
    }
    LogTransformStream.prototype._transform = function (chunk, encoding, done) {
        var data = chunk.toString();
        if (this._lastLineData) {
            data = this._lastLineData + data;
        }
        var lines = data.split('\n');
        this._lastLineData = lines.splice(lines.length - 1, 1)[0];
        lines.forEach(this.push.bind(this));
        done();
    };
    LogTransformStream.prototype._flush = function (done) {
        if (this._lastLineData) {
            this.push(this._lastLineData);
        }
        this._lastLineData = null;
        done();
    };
    return LogTransformStream;
}(stream_1.Transform));
exports.LogTransformStream = LogTransformStream;

//# sourceMappingURL=../maps/implementations/LogTransformStream.js.map
