const Discord = require('discord.js');
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args) => {

        avatar = message.author.avatarURL
    let channel = message.mentions.channels.first() || message.channel;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`| Informações do canal **${channel.name}**`)
    .setTimestamp()
    .setColor("#36393f")
    .addField("Nome:", `${channel.name}`)
    .addField("ID do canal:", `${channel.id}`)
    .addField("📆Criado em:", `${moment(channel.createdAt).format("LLLL")}`)
    .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(`${message.author}`)
    message.channel.send(embed).then(async msg => {
        await msg.react('745161302594420779')
      
        const DeleteFilter = (reaction, user) => reaction.emoji.name === '745161302594420779' && user.id === message.author.id;
          const deletee = msg.createReactionCollector(DeleteFilter);

      
deletee.on('collect', async bot => {
       await msg.delete()

    })
})
  
  }

module.exports.config = {
    name: "canalinfo",
    aliases: ["channelinfo", "canalinfo"]
    }
