const discord = require('discord.js')
var cor = '#36393f'

exports.run = async(client, message, args) => {
   let usuario = client.users.cache.get(args[0]) || message.mentions.users.first() 
   if(!message.guild.member(message.author.id).hasPermissions("BAN_MEMBERS")) return message.reply(":BlobBanHammer: **|** Você não tem permissão para executar este comando!")
   if(message.mentions.users.size < 1) return message.reply('Mencione algum membro')
   if(!message.guild.member(usuario).bannable) return message.reply(`:x: **|** Eu não posso punir essa pessoa, talvez o cargo dela seja maior que o meu`)
   var razao = args.slice(1).join(' ') 
   if (!razao) razao = "Sem motivo declarado"
   message.guild.member(usuario).ban()
   message.guild.unban(usuario)
  var embed = new discord.MessageEmbed()
.setDescription(`${usuario.username} foi **SOFT BANIDO** do servidor por ${message.author}\nMotivo: ${razao} `)
.setColor(cor)
message.channel.send(embed)
}

