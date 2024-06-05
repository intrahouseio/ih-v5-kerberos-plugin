const kerberos = require('kerberos');

async function main() {
  const token = 'YII...'
  const service = 'HTTP@scada.my-company.com';

  const kerberosServer = await kerberos.initializeServer(service);
  
  await kerberosServer.step(token);


  console.log(kerberosServer.username)
  console.log(kerberosServer.targetName)
  console.log(kerberosServer.contextComplete)
  console.log(kerberosServer.response)
}

main();

