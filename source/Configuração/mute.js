const database = require("../../configuração/database");
const ms = require("ms");
const moment = require("moment");
const Discord = require("discord.js")
require("moment-duration-format");

exports.run = async (client, message, args) => {

database.Guilds.findOne({ _id: message.guild.id }, async function (err, server) {

  if ({ message, args }) {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        `${message.author}, você precisa da permissão **MUTE_MEMBERS* para executar este comando.`
      );

    if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        `${message.author}, preciso da permissão de **MUTE_MEMBERS** para executar este comando.`
      );

    const doc = await database.Guilds.findOne({
      _id: message.guild.id,
    });

    const USER = message.guild.member(
      client.users.cache.get(args[0]) || message.mentions.users.first()
    );

    if (!USER)
      return message.channel.send(
        `${message.author}, você deve mencionar quem deseja mutar primeiro.`
      );
    if (!args[1])
      return message.channel.send(
        `${message.author}, você deve inserir quanto tempo deseja mutar o membro.`
      );
    let time = ms(args[1]); // Tempo do Mute
    let reason = !args[2] ? "Não Informado" : args.slice(2).join(" "); // Motivo do Mute

    if (!time)
      return message.channel.send(`${message.author}, tempo inválido.`);
    if (!USER.manageable)
      return message.channel.send(
        `${message.author}, não posso mutar o membro poís ele tem um cargo maior que o meu.`
      );

    if (doc.mutes.list.find((x) => x.user === USER.user.id))
      return message.channel.send(
        `${message.author}, o membro já se encontra mutado em minha DataBase.`
      );

    let role = message.guild.roles.cache.find((x) => x.name === "Mutado");

    if (!role)
      role = await message.guild.roles
        .create({ data: { name: "Mutado", color: "GRAY" } })
        .then((x) => {
          message.guild.channels.cache.forEach((f) => {
            f.createOverwrite(x.id, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              STREAM: false,
            });
          });
        });

    message.channel.send(
      `${
        message.author
      }, o(a) ${USER} foi mutado pelo tempo de **${moment
        .duration(time)
        .format(
          "d[d] h[h] m[m] s[s]"
        )}** pelo motivo: **${reason}** com sucesso.`
    );
    USER.roles.add(role, `Mutado por ${message.author.tag} - ${reason}`);

    await database.Guilds.findOneAndUpdate(
      { _id: message.guild.id },
      {
        $push: {
          "mutes.list": [
            { user: USER.user.id, reason: reason, time: time + Date.now() },
          ],
        },
      }
    );
    embed2 = new Discord.MessageEmbed()
    .setAuthor(message.guild.name + " - Membro mutado")
   .setColor("#36393f")
    .addFields(
     { name: '👤 Membro', value: USER, inline: true },
     { name: '🔨 Moderador', value: message.author.tag, inline: true },
     { name: '🕛 Tempo de mute', value: time, inline: true},
     { name: '🔹 Id do usuário', value: USER.id},
     { name: '📋 Motivo', value: reason },
   )
   if (!server.logs4.status) {
    message.channel.send(embed2);
  } else {
    let channel = message.guild.channels.cache.get(server.logs4.channel);
    channel.send(embed2);
   USER.send(embed2);
    await database.Guilds.findOneAndUpdate(
      { _id: message.guild.id },
      { $set: { "mutes.has": 5 } }
    );
  }
  }
})
}


