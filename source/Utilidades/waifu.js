const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
      let m421 = args.join(" ");
      if (!m421) return message.reply(new Discord.MessageEmbed()
      .setColor("#36393f")
      .setTimestamp()
      .setDescription(`Por favor fale um nome primeiro!`))
      
      if (m421.length > 30) return message.reply(new Discord.MessageEmbed()
      .setColor("#36393f")
      .setTimestamp()
      .setDescription(`${user1}, Eu não posso avaliar o seu waifu, por ter mais de 30 palavras`))
      let result = Math.floor((Math.random() * 100) + 0);
      
        const happyrate = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 ❤`)
      .setColor("#36393f")
      .setTimestamp()
        
          const sadembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 😭`)
      .setColor("#36393f")
      .setTimestamp()
          
            const idkembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 🤔`)
      .setColor("#a36393f")
      .setTimestamp()
            
          const shrugembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 🤷`)
      .setColor("#36393f")
      .setTimestamp()
                    
              const okembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 👌`)
      .setColor("#36393f")
      .setTimestamp()
                            
      const thumbupembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 👍`)
      .setColor("#36393f")
      .setTimestamp()
      
      const eyesembed = new Discord.MessageEmbed()
      .setDescription(`Eu classificaria **${m421}** ${result}/100 👀`)
      .setColor("#36393f")
      .setTimestamp()
      
      if (result > 90) return message.channel.send(happyrate)
      if (result < 30) return message.channel.send(sadembed)
      if (result > 40) return message.channel.send(idkembed)
      if (result > 50) return message.channel.send(shrugembed)
      if (result > 60) return message.channel.send(okembed)
      if (result > 70) return message.channel.send(thumbupembed)
      if (result > 80) return message.channel.send(eyesembed)
}
