const Discord = require("discord.js");
const database = require("../../configuração/database");

exports.run = async (client, message, args) => {
database.Guilds.findOne({ _id: message.guild.id }, async function (err, server) {

let member = message.mentions.members.first();

if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author}, você não tem permissão para banir membros.`);

let reason = args.slice(1).join(" ")
if(!reason) reason = "Não informado";

if(!member) return message.channel.send(`${message.author}, você precisa mencionar/inserir o ID do membro que deseja banir.`);
if(!member.bannable)  return message.channel.send(`${message.author}, eu não consegui banir o membro, provalvemente ele tem permissões mais altas que a minha.`);
if (member.id == message.author.id) return message.channel.send(`${message.author}, você não pode si banir.`);
 if(server.logs2.status) {
const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name + " - Membro banido", message.guild.iconURL({dynamic: true}))
.setColor("#36393f")
.setFooter(`Comando requisitado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.addFields(
{ name: '👤 Usuário', value: member.user.tag, inline: true },
{ name: '🔨 Moderador', value: message.author.tag, inline: true },
{ name: '🔹 Id do usuário', value: member.user.id },
{ name: '📋 Motivo', value: reason },
    ); 
member.send(embed)
message.channel.send(embed) 
member.ban({ days: 7, reason: reason });
  client.channels.cache.get(server.logs2.channel).send(embed)  
     } else {
  return; // https://discord.gg/hj4trWdb
}
  })
}