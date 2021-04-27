const Discord = require('discord.js');

exports.run = (client, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setColor(0x010101)
        .setTitle(`📷 Ícone de Servidor`)
        .addField(`Ícone de:`, `\`${message.guild.name}\``, true)
        .addField(`Baixe:`, `[[Clique aqui]](${message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 })})`, true)
        .setImage(message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }))
        .setFooter(`2021 © ${message.guild.name}`)
        .setTimestamp();
        
    message.channel.send({ embed });
}