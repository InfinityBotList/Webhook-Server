const { Client, Intents } = require("discord.js");
const config = require("../../config");
const evt = require("./events");

const client = new Client({
  shards: "auto",
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "USER"],
});

module.exports = client;

client.config = config;

evt(client);

client.login(config.bot_token);
