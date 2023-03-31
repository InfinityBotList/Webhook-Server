const { MessageEmbed } = require("discord.js");
const { Reedhook } = require("@infinitybots/client");
const config = require("../../../../config");
const moment = require("moment");

const webhook = new Reedhook(config.hook_secret);

/**
 * FOR AVAILABLE VOTE DATA SEE
 * https://www.npmjs.com/package/@infinitybots/client
 */

module.exports = async (fastify, opts) => {
  fastify.post(
    "/votes",
    webhook.hookListener(async (voteData, req, res) => {
      let client = req.client;

      console.log(voteData);

      let embed = new MessageEmbed()
        .setTitle(`Vote Logs`)
        .setColor("RANDOM")
        .setDescription(`Woah someone has voted for me on Infinity Bot List`)
        .addFields(
          {
            name: "Total Votes",
            value: `${voteData.data.votes}`,
            inline: true,
          },
          {
            name: "User",
            value: `${voteData.creator.username}#${voteData.creator.discriminator}`,
            inline: true,
          },
          {
            name: "Time",
            value: `${moment(voteData.created_at)}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Infinity Vote Logger",
          iconURL: `${voteData.creator.avatar}`,
        });

      return client.guilds.cache
        .get(config.guildID)
        .channels.cache.get(config.voteLogs)
        .send({ embeds: [embed] });
    })
  );
};
