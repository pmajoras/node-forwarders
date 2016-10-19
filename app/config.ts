//'https://pgp-logs-app.herokuapp.com/api/user/56bcfab05c9289600c000001/processMessage'
import * as path from 'path';
const filesReadJsonPath = path.join(__dirname, 'filesRead.json');

export const config = {
  directoryPath: 'C:/inetpub/logs/LogFiles/W3SVC1/*.log',
  processorUrl: 'http://localhost:8085/api/user/56bcfab05c9289600c000001/processMessage',
  appId: 'IIS',
  filesToReadObjectPath: filesReadJsonPath,
  processTimeout: 20
};
