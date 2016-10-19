'use strict';
var request = require('request');
var Q = require('q');
var HttpForwarder = (function () {
    function HttpForwarder(config) {
        console.log('suber');
        config = config || {};
        this.config = {
            url: config.url,
            appId: config.appId
        };
    }
    HttpForwarder.prototype.forward = function (messages) {
        var defer = Q.defer();
        var body = {
            appId: this.config.appId,
            messages: messages.map(function (mess) { return mess.message; })
        };
        request.post({ url: this.config.url, json: true, body: body }, function (err, httpResponse, body) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(body);
            }
        });
        return defer.promise;
    };
    HttpForwarder.prototype.dispose = function () {
        console.log('dispose');
    };
    return HttpForwarder;
}());
exports.HttpForwarder = HttpForwarder;

//# sourceMappingURL=../maps/implementations/HttpForwarder.js.map
