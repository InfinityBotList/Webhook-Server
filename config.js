/**
 * CONFIG FILE FOR WEBHOOK SERVER
 * @default bot_token Your Discord Bot Token found at https://discord.com/developers/applications/{BOT_ID}/bot
 * @default domain The domain to use for the webserver (Ex: vots.infinitybots.gg)
 * @default guildID The Guild ID to send logs to when someone votes for your bot
 * @default voteLogs The Channel ID to send logs to when someone votes for your bot (channel should exist in the guild listed with `guildID`)
 * @default port The port for the webserver to run on
 */

module.exports = {
  hook_secret: "",
  bot_token: "",
  domain: "",
  guildID: "",
  voteLogs: "",
  port: 4223,
};
