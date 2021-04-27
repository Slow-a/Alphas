const database = require("../../configuração/database");
const { MessageEmbed, Message } = require("discord.js");
const Emojis = require("../../Emojis");


exports.run = (client, message, args) => {
  database.Guilds.findOne({ _id: message.guild.id }, async function (err, server) {
    const channel =
      message.guild.channels.cache.get((x) => x.id == args[1]) ||
      message.mentions.channels.first();
    if (args[0] == "set") {
      if (!channel) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, você não inseriu um ID/mencionou um canal para eu setar como canal de logs4.`
        );
      } else if (channel.id == server.logs5.channel) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, o canal inserido é o mesmo setado atualmente, tente novamente.`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, o canal de logs5 foi alterado para **<#${channel.id}>** com sucesso.`
        );
        await database.Guilds.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "logs5.channel": channel.id } }
        );
      }
      return;
    }
    if (args[0] == "on") {
      if (server.logs.channel == "null") {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, para ativar seu sitema de logs5, sete um canal primeiro.`
        );
      } else if (server.logs5.status) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, o sistema já se encontra ativado.`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, sistema ativado com sucesso.`
        );
        await database.Guilds.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "logs5.status": true } }
        );
      }
      return;
    }
    if (args[0] == "off") {
      if (!server.logs.status) {
        return message.channel.send(
          `${Emojis.Errado} - ${message.author}, o sistema já se encontra desativado.`
        );
      } else {
        message.channel.send(
          `${Emojis.Certo} - ${message.author}, sistema desativado com sucesso.`
        );
        await database.Guilds.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { "logs5.status": false } }
        );
      }
      return;
    }
    const HELP = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTimestamp()
      .setFooter(
        `Comando requisitado por ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
      .setAuthor(
        `Sistema de Logs - ${message.guild.name}`,
        client.user.displayAvatarURL()
      )
      .addFields(
        {
          name: `Canal Setado`,
          value:
            server.logs5.channel == "null"
              ? "Nenhum Canal Setado"
              : `<#${server.logs5.channel}>`,
        },
        {
          name: "Status do Sistema",
          value: `No momento o sistema se encontra **${
            server.logs5.status ? `ativado` : "desativado"
          }**`,
        }
      );
    message.channel.send(message.author, HELP);
  });
};

exports.help = {
  name: "logs5",
  aliases: ["log"],
  description: "Comando para configurar o canal de logs5 do servidor",
  usage: "<prefix>logs5 <#channel>",
  category: "Config",
};