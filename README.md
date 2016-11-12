# (pgp-logs client) node-forwarders
A client that will be used to send the log messages to the logs processor. (pgp-logs-processor)

## Requirements
* NodeJs 5.x or 6.x version and NPM [environment](https://nodejs.org/en/)


## Setup

 * Download/clone the source code in the desired path.
```HTML
git clone https://github.com/pmajoras/node-forwarders.git
```
 * Go to the folder and download the dependencies
 
 ```HTML
 npm install
 ```
 
 * Open the release/config.js file, and configure the folder wich will be monitored.
 
 ```HTML
 
  var path = require('path');
  var filesReadJsonPath = path.join(__dirname, 'filesRead.json');
  exports.config = {
      directoryPath: 'C:/inetpub/logs/LogFiles/W3SVC1/*.log', // Files to be watched.
      processorUrl: 'https://pgp-logs-app.herokuapp.com/api/user/[YOUR USER ID HERE]/processMessage',
      appId: 'IIS', // Id of the application registered on the pgp-logs web app.
      filesToReadObjectPath: filesReadJsonPath,
      processTimeout: 20 // The time in seconds beetween when the client will send the messages to the processor, in case it is not already sending.
  };
 ```

## Usage
 * Start the process.
 
 ```HTML
  c:\..\..\release\ node index
 ```

## TODO

Finish documentation and change repository name.

## FAQ

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
