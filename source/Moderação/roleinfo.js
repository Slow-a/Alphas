const Discord = require('discord.js');
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args) => {

    avatar = message.author.avatarURL
    let role = message.mentions.roles.first() || message.role;
    if(!role) return message.channel.send(new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#36393f")
    .setDescription('<:cancel:504782695667335178> | Você deve mencionar um cargo!')).then(m => m.delete(5000))
    let mention;
    if(role.mentionable === true)  mention = "Sim"
    if(role.mentionable === false) mention = "Não"
    moment.locale("pt-BR")
    const embed = new Discord.MessageEmbed()
    .setColor("#36393f")
    .setThumbnail("https://cdn.discordapp.com/attachments/504474789231067138/507580155871363092/board-games-with-roles.png")
    .setDescription(`<:custom:505150729216851970> | Informações do cargo **${role.name}**`)
    .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
    .addField("<:st:832876660578582548> Nome do cargo:", `${role.name}`)
    .addField("<:st:832876660578582548> ID do cargo:", `${role.id}`)
    .addField("<:st:832876660578582548> Cargo criado em:", `${moment(role.createdAt).format("LLLL")}`)
    .addField("<:st:832876660578582548> Permissões:", `${role.permissions}`)
    .addField("<:st:832876660578582548> Mencionavel:", mention)
    .addField("<:st:832876660578582548> Cor:", `${role.color}`)
    message.channel.send(embed).then(async msg => {
        await msg.react('❌')
      
        const DeleteFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
          const deletee = msg.createReactionCollector(DeleteFilter);

      
deletee.on('collect', async bot => {
       await msg.delete()

    })
})
    }


