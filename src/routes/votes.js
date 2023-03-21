const { MessageEmbed } = require("discord.js");
const { Webhook } = require("@infinitybots/client");
const config = require("../../config");
const moment = require("moment");

const webhook = new Webhook(`${config.hook_secret}`);

/**
 * AVAILABLE VOTE DETAILS
 * {
 *    votes: integer, // Number of total votes
 *    user: snowflake, // ID of the user who voted
 *    userObj: {
 *       id: snowflake // ID of the user who voted
 *       username: string, // Username of the user who voted
 *       discriminator: string, // Discriminator of the user who voted
 *       avatar: string, // Avatar of the user who voted
 *       bot: boolean, // If the user is a bot or real user
 *       status: string, // Status of the user "online" etc
 *       nickname: string, // The users nickname on discord
 *       in_guild: string,  // If the user is in our guild
 *   },
 *   bot: snowflake, // The ID of the bot that received the vote
 *   userID: snowflake, // The ID of the user who voted
 *   botID: snowflake, // The ID of the bot that received the vote
 *   test: false, // If this is a test webhook or not
 *   time: integer, // The time of the vote in ms
 *   userName: string, // The username of the user who voted
 *   count: integer, // The number of votes the user sent (will be 2 if on a weekend in MST)
 *   type: string // VOTE or TEST
 *   timeStamp: integer // The timestamp of the vote in ms
 * }
 */

module.exports = async (fastify, opts) => {
  fastify.post(
    "/votes",
    webhook.hookListener(async (vote, req, res) => {
      let client = req.client;

      let ember = new MessageEmbed()
        .setTitle(`Vote Logs`)
        .setColor("RANDOM")
        .setDescription(`Woah someone has voted for me on Infinity Bot List`)
        .addFields(
          {
            name: "Total Votes",
            value: `${vote.votes}`,
            inline: true,
          },
          {
            name: "User",
            value: `${vote.userObj.username}#${vote.userObj.discriminator}`,
            inline: true,
          },
          {
            name: "Time",
            value: `${moment(vote.timeStamp)}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Infinity Vote Logger",
          iconURL: `${vote.userObj.avatar}`,
        });

      await client.guilds.cache
        .get(config.guildID)
        .channels.cache.get(config.voteLogs)
        .send({ embeds: [embed] });

      return res.status(204).send("Success");
    })
  );
};
