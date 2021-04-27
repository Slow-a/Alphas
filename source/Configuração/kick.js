const Discord = require("discord.js");
const database = require("../../configuração/database");
exports.run = async (client, message, args) => {

  if({message, args,}) {
    database.Guilds.findOne({ _id: message.guild.id }, async (err, server) => {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          `${message.author}, você não tem permissão para kickar membros.`
        );
      let member = message.guild.member(
        message.guild.members.cache.get(args[0]) ||
          message.mentions.members.first()
      );

      let reason;
      if (!args[1]) reason = "Não informado";
      else reason = args.slice(1).join(" ");

      if (!member) {
        return message.channel.send(
          `${message.author}, você precisa mencionar/inserir o ID do membro que deseja kickar.`
        );
      } else if (!member.bannable) {
        return message.channel.send(
          `${message.author}, eu não consegui kickar o membro, provalvemente ele tem permissões mais altas que a minha.`
        );
      } else if (member.id == message.author.id) {
        return message.channel.send(`${message.author}, você não pode si kickar.`);
      } else {
        const KICK = new Discord.MessageEmbed()
          .setAuthor(
            `${message.guild.name} - Membro Kickado`,
            message.guild.iconURL({ dynamic: true })
          )
          .setFooter(
            `Comando requisitado por ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .addFields(
            { name: '👤 Membro', value: member.user.tag, inline: true },
            { name: '🔨 Moderador', value: message.author.tag, inline: true },
            { name: '🔹 Id do usuário', value: member.id},
            { name: '📋 Motivo do kick', value: reason },
          );
           member.send(KICK)
        if (!server.logs3.status) {
          message.channel.send(KICK);
        } else {
          let channel = message.guild.channels.cache.get(server.logs3.channel);
          channel.send(KICK);
        }
        member.kick({ days: 7, reason: reason });
      }
    });
  }
}