const database = require("../../configuração/database");
const Discord = require("discord.js")
exports.run = async (client, message, args) => {

    database.Guilds.findOne({ _id: message.guild.id }, async function (err, server) {

  if({ message, args, }) {
    const doc = await database.Guilds.findOne({
      _id: message.guild.id,
    });

    const USER = message.guild.member(
      client.users.cache.get(args[0]) || message.mentions.users.first()
    );

    if (!USER)
      return message.channel.send(
        `${message.author}, você deve mencionar quem deseja desmutar.`
      );

    let role = message.guild.roles.cache.find((x) => x.name === "Mutado");

    if (!doc.mutes.list.find((x) => x.user === USER.id))
      return message.channel.send(
        `${message.author}, este membro não está mutado.`
      );

    message.channel.send(`${message.author}, membro desmutado com sucesso.`);

    await database.Guilds.findOneAndUpdate(
      { _id: message.guild.id },
      {
        $pull: { "mutes.list": doc.mutes.list.find((x) => x.user === USER.id) },
      }
    );
    embed2 = new Discord.MessageEmbed()
    .setAuthor(message.guild.name + " - Mute Retirado")
   .setColor("#36393f")
    .addFields(
     { name: '👤 Membro', value: USER, inline: true },
     { name: '🔨 Moderador', value: message.author.tag, inline: true },
   )
   
   USER.send(embed2);
   if (!server.logs5.status) {
    message.channel.send(embed2);
  } else {
    let channel = message.guild.channels.cache.get(server.logs5.channel);
    channel.send(embed2);
    USER.roles
      .remove(role, `Membro desmutado por: ${message.author.tag}`)
      .catch((err) => {
        return message.channel.send(
          `${message.author}, este membro não tinha o cargo de mute.`
        );
      });
  }
}
    })
  }