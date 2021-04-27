const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed()
    .setColor("#36393f")
    .setTimestamp()
    .setDescription("<:cancel:504782695667335178> | Você não tem permissão para executar este comando.")).then(m => m.delete(5000))

        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setTimestamp()
        .setDescription("<:cancel:504782695667335178> Por favor, forneça um número entre __**2**__ e **__100__** para o número de menssagens a serem excluídas!"))
        
        const fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
        .catch(error => message.reply(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setTimestamp()
        .setDescription(`<:cancel:504782695667335178> Não foi possível deletar mensagens devido a: **Terem mais de 14 dias**`)))
      
        return message.channel.send(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setAuthor("Senpai", message.client.user.displayAvatarURL)
        .setDescription(`• ***Pelo:***\n ${message.author}`)
        .addField(`• ***Quantidade:***`,`\`${args[0]}\``)
        .setFooter("Senpai", message.client.user.displayAvatarURL))
    }
