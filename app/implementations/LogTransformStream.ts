'use strict';
import {Transform} from 'stream';

export class LogTransformStream extends Transform {
  constructor(options) {
    super(options);
  }

  private _lastLineData: any;

  _transform(chunk, encoding, done) {
    var data = chunk.toString();
    if (this._lastLineData) {
      data = this._lastLineData + data;
    }

    var lines = data.split('\n');
    this._lastLineData = lines.splice(lines.length - 1, 1)[0];

    lines.forEach(this.push.bind(this));
    done();
  }

  _flush(done) {
    if (this._lastLineData) {
      this.push(this._lastLineData);
    }

    this._lastLineData = null;
    done();
  }
}
