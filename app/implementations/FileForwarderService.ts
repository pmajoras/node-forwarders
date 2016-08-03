'use strict';
import {FSWatcher} from 'fs';
import {IForwarderService} from '../interfaces/IForwarderService';

export class FileForwarderService implements IForwarderService {
  constructor(watcher: FSWatcher) {
    if (watcher === null) {
      throw new Error('The watcher is required.');
    }

    this.isDisposed = false;
    this.watcher = watcher;
    this.watcher.on('all', (event: any, path: any) => {
      console.log(event, path);
    });
  }

  private watcher: FSWatcher;
  private isDisposed: boolean;

  /**
   *
   * @param {string} content
   */
  forward(content: string) {
    console.log('forward');
  }

  onInit() {
    console.log('onInit');
  }

  onFinish() {
    console.log('onFinish');
  }

  onForwardError() {
    console.log('onForwardError');
  }

  onForwardSuccess() {
    console.log('onForwardSuccess');
  }

  onForwardStart() {
    console.log('onForwardStart');
  }

  dispose() {
    if (!this.isDisposed) {
      this.onFinish();
      if (this.watcher !== null) {
        this.watcher.close();
        this.watcher = null;
      }
    }
  }
}
