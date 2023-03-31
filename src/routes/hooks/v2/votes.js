const { MessageEmbed } = require("discord.js");
const { Reedhook } = require("@infinitybots/client");
const config = require("../../../../config");
const moment = require("moment");

const webhook = new Reedhook("3d7983523efe6e06a8e73a471bb0eb90bd2edfa06b7aff5afb505c064af1a73a666f4739084f73b609ba103c02a15a87fc3fdabf72d7f7dcf83877a497fd640a");

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
