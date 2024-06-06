/**
 * app.js
 *
 *   Основной модуль плагина
 *
 */
const util = require('util');
const kerberos = require('kerberos');

module.exports = async function(plugin) {
  const { spn='' } = plugin.params;
  /*
  let kerberosServer = {};
  try {
    kerberosServer = await kerberos.initializeServer(spn);
  } catch (e) {
    plugin.log("Initialization error " + util.inspect(e), 1)
  }
  */
  
  plugin.onCommand(async message => {
    plugin.log('Get command ' + util.inspect(message), 1);
 
    if (message.param == 'checkToken') {
      try {
        const kerberosServer = await kerberos.initializeServer(spn);
        plugin.log("kerberosServer.step  token=" + message.data, 1);
        await kerberosServer.step(message.data);
    
        plugin.log("kerberosServer.username=" + kerberosServer.username, 1);
        plugin.log("kerberosServer.targetName=" + kerberosServer.targetName, 1);
        
        message.data = kerberosServer.username;
        plugin.sendResponse(message, 1);
      } catch (e) {
        plugin.sendResponse(message, 0);
        plugin.log("Autorization error " + util.inspect(e), 1)
      }
    } else {
      plugin.log('Unknown command ' + message.param, 1);
    }
  });

  /*console.log(kerberosServer.username)
  console.log(kerberosServer.targetName)
  console.log(kerberosServer.contextComplete)
  console.log(kerberosServer.response)*/

  process.on('SIGTERM', async () => {
    plugin.exit();
  });
};

