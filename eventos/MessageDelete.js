const { MessageEmbed } = require("discord.js");
const logger = require("../logger");
const database = require("../configuração/database");

module.exports = async (client, message) => {
  database.Guilds.findOne({ _id: message.guild.id }, async function (err, server) {
    try {
      if (message.author.bot) return; // caso um bot tenha deletado alguma mensagem ele não vai mandar no canal de LOGS.
      const guild = message.guild;

      const UPDATE = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle(`Mensagem Deletada`)
        .addFields(
          {
            name: `Author`,
            value: message.author, // pega o author da mensagem
          },
          {
            name: `Contéudo da Mensagem`,
            value: message.content,
          },
          {
            name: `Canal`,
            value: message.channel,
          }
        )
        .setThumbnail(
          message.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setFooter(
          `${message.author.tag} | ${message.author.id}`,
          message.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setTimestamp()
        .setColor('#36393f');

      if (server.logs.status) {
        const channel = guild.channels.cache.get(server.logs.channel);
        channel.send(UPDATE);
      }
    } catch (err) {
      logger.error(`EVENTO: MessageDelete`);
    }
  });
};