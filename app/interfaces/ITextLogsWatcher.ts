'use strict';
import { IDisposable } from '../common/IDisposable';

interface ILogsWatcher extends IDisposable {
  addNewMessagesListener(listener: Function) : void;
  removeNewMessagesListener(listener: Function) : void;
}

export interface ITextLogsWatcher extends ILogsWatcher {
  onFileAdded(path: string) : void;
  onFileChanged(path: string) : void;
  onFileRemoved(path: string) : void;
}
