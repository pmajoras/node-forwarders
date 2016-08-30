'use strict';
import {IHttpForwarder} from '../interfaces/IHttpForwarder';
import {ILogMessageContainer} from '../interfaces/ILogMessages';
import * as request from 'request';
import * as Q from 'q';

interface IHttpConfig {
  url: string;
  appId: string;
}

export abstract class HttpForwarder implements IHttpForwarder {
  constructor(config) {
    console.log('suber');
    config = config || {};

    this.config = {
      url: config.url,
      appId: config.appId
    };
  }

  private config: IHttpConfig;

  forward(messageContainer: Array<ILogMessageContainer>): Q.Promise<any> {

    let defer = Q.defer();
    let messages = [];
    messageContainer.forEach((message) => {
      message.messages.forEach((messageValue) => {
        messages.push(messageValue);
      });
    });

    let body = {
      appId: this.config.appId,
      messages: messages
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
