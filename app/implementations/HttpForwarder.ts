'use strict';
import {IHttpForwarder} from '../interfaces/IHttpForwarder';
import {ILogMessageContainer} from '../interfaces/ILogMessages';
import * as request from 'request';

export abstract class HttpForwarder implements IHttpForwarder {
  constructor() {

  }

  forward(messageContainer: ILogMessageContainer): Promise<any> {

    var promise = new Promise((resolve, reject) => {

      request.post({ url: 'http://service.com/upload', formData: {} }, function optionalCallback(err, httpResponse, body) {
        if (err) {
          reject(err);
          return;
        }

        resolve(body);
      });
    });

    return promise;
  }

  dispose() {
  }
}
