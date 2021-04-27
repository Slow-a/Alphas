const Discord = require("discord.js")
module.exports = {
    run: (client, message, args) => {
      if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não pode usar esse comando!') }
  
      let argsresult
      const mChannel = message.mentions.channels.first()
  
      message.delete()
      if (mChannel) {
        argsresult = args.slice(1).join(' ')
        mChannel.send(argsresult)
      } else {
        argsresult = args.join(' ')


        const embed = new Discord.MessageEmbed()
        .setDescription(`<a:TrianguloVermBDA:827094202408108032> ${argsresult}`)
        .setColor('#36393f')
        .setFooter(`Comando utilizado por: ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
        
        message.channel.send(embed)
      }
    },
  
    conf: {},
  
    get help () {
      return {
        name: 'say',
        category: 'Moderação',
        description: 'Faz o bot enviar tal mensagem.',
        usage: 'say',
        admin: true
      }
    }
  
  }


