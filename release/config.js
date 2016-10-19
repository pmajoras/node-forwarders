"use strict";
//'https://pgp-logs-app.herokuapp.com/api/user/56bcfab05c9289600c000001/processMessage'
var path = require('path');
var filesReadJsonPath = path.join(__dirname, 'filesRead.json');
exports.config = {
    directoryPath: 'C:/inetpub/logs/LogFiles/W3SVC1/*.log',
    processorUrl: 'http://localhost:8085/api/user/56bcfab05c9289600c000001/processMessage',
    appId: 'IIS',
    filesToReadObjectPath: filesReadJsonPath,
    processTimeout: 20
};

//# sourceMappingURL=maps/config.js.map
