//'https://pgp-logs-app.herokuapp.com/api/user/56bcfab05c9289600c000001/processMessage'
import * as path from 'path';
const filesReadJsonPath = path.join(__dirname, 'filesRead.json');

export const config = {
  // Caminho do diretório onde os logs da aplicação estão.
  directoryPath: 'C:/Users/Gabriel/Desktop/apache-logs-test/*.log',
  // Caminho da URL do serviço de processamento do Pgp-Logs
  processorUrl: 'https://pgp-logs-processor.herokuapp.com/api/user/58097f34dcba0f490c7242c1/processMessage',
  // AppId cadastrado na interface Web.
  appId: 'ifrsApache',
  // Variavel responsável por indicar o caminho do json que contém com os nomes dos arquivos e linhas que foram lidos na ultima vez que foi executado o serviço.
  // Caso seja a primeira vez que o serviço esteja executando e não exista o arquivo, este arquivo será criado.
  filesToReadObjectPath: filesReadJsonPath,
  // Tempo de execução de cada ciclo em segundos. (Leitura dos arquivos novos ou que foram modificados e envio destas mudanças para o serviço de processamento)
  // Não é executado um novo ciclo se um ciclo ainda estiver executando.
  processCicle: 30
};
