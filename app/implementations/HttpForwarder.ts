'use strict';
import { IHttpForwarder } from '../interfaces/IHttpForwarder';
import { ILogMessage } from '../interfaces/ILogMessages';
import * as request from 'request';
import * as Q from 'q';

interface IHttpConfig {
  url: string;
  appId: string;
}

export abstract class HttpForwarder implements IHttpForwarder {
  constructor(config: any) {
    console.log('suber');
    config = config || {};

    this.config = {
      url: config.url,
      appId: config.appId
    };
  }

  private config: IHttpConfig;

  forward(messages: Array<ILogMessage>): Q.Promise<any> {

    let defer = Q.defer();

    let body = {
      appId: this.config.appId,
      messages: messages.map((mess) => mess.message)
    };

    request.post({ url: this.config.url, json: true, body: body }, (err, httpResponse, body) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(body);
      }
    });

    return defer.promise;
  }

  dispose() {
    console.log('dispose');
  }
}
