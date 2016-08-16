/// <reference path="../../../../typings/index.d.ts" />

import {FileForwarderService} from '../../../implementations/FileForwarderService';
import {expect} from 'chai';
import {FSWatcher} from 'fs';

describe('FileForwarderService - Constructor', () => {
  let target: FileForwarderService;
  let watcher = <FSWatcher>{on: (event: string, listener: Function) => null};

  beforeEach(function () {
    target = null;
  });

  it('should throw exception', () => {
    let fn = () =>  new FileForwarderService(null);
    expect(fn).to.throw(Error);
  });

  it('should not throw exeption and set watcher property', () => {
    let target = new FileForwarderService(watcher);
  });
});
