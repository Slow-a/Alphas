const { MessageEmbed } = require("discord.js");
const logger = require("../logger");
const database = require("../configuração/database");

module.exports = async (client, oldMessage, newMessage) => {
  database.Guilds.findOne({ _id: newMessage.guild.id }, async function (err, server) {
    try {
      if (newMessage.author.bot) return; // caso um bot tenha editado alguma mensagem ele não vai mandar no canal de LOGS.
      const guild = newMessage.guild;

      const UPDATE = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle(`Mensagem Editada`)
        .addFields(
          {
            name: `Author`,
            value: newMessage.author, // pega o author da mensagem
          },
          {
            name: `Mensagem Anterior`,
            value: oldMessage.content,
          },
          {
            name: `Mensagem Posterior`,
            value: newMessage.content,
          },
          {
            name: `Canal`,
            value: newMessage.channel,
          }
        )
        .setThumbnail(
          newMessage.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setFooter(
          `${newMessage.author.tag} | ${newMessage.author.id}`,
          newMessage.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setTimestamp()
        .setColor('#36393f');

      if (server.logs.status) {
        const channel = guild.channels.cache.get(server.logs.channel);
        channel.send(UPDATE);
      }
    } catch (err) {
      logger.error(`EVENTO: MessageUpdate`);
    }
  });
};