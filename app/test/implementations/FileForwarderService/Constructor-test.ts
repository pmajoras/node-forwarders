/// <reference path="../../../../typings/index.d.ts" />

import {FileForwarderService} from '../../../implementations/FileForwarderService';
import {expect} from 'chai';
import {FSWatcher} from 'fs';
import {TextLogsWatcher} from '../../../implementations/TextLogsWatcher';

describe('FileForwarderService - Constructor', () => {
  let target: FileForwarderService;
  let textLogWatcher = new TextLogsWatcher({ path: 'path' });

  beforeEach(function () {
    target = null;
  });

  it('should throw exception', () => {
    let fn = () => new FileForwarderService(null);
    expect(fn).to.throw(Error);
  });

  it('should not throw exeption and set watcher property', () => {
    let target = new FileForwarderService(textLogWatcher);
  });
});
