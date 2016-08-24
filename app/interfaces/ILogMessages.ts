'use strict';

export interface ILogMessage {
  line: number;
  message: string;
}

export interface ILogMessageContainer {
  filePath: string;
  messages: Array<ILogMessage>;
}
