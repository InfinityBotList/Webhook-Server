const { readdirSync } = require("fs");

function ClientEvents(client) {
  readdirSync("./src/events/").forEach((file) => {
    const event = require(`../events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Client Event: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
}

module.exports = ClientEvents;
