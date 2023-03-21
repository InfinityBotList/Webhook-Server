const WebhookServer = require("../server/index");

module.exports = async (client) => {
  await WebhookServer(client);

  return console.log("Client and Web Server are online.");
};
