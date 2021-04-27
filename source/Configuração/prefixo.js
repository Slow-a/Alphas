const database = require("../../configuração/database.js"); 
const Discord = require("discord.js");

exports.run = async (xerphos, message, args, prefixo) => {
  
console.log(`Comando prefixo ${message.guild.name} ${message.guild.id} ${message.author.tag}`)
  
database.Users.findOne({_id: message.author.id}, function (erro, usuario) {
  
  if(usuario.owner || message.member.hasPermission("ADMINISTRATOR")) {
    
database.Guilds.findOne({_id: message.guild.id}, function (servro, servidor) {
  
  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  if(razaod.length > 3) return message.channel.send({embed: {
    description: `**${message.author.tag}**, Desculpe, o **máximo** de carcteres é **3**`,
    color: 0x36393f
}});
                    
          
          if(servidor) {
            if(!razaou.length < 1) {
              if(args[0] == "set") { 
                if(!razaod.length < 1) {

                  servidor.prefix = razaod
                  servidor.save()
                  
                  let sEmbed = new Discord.MessageEmbed()

                  .setColor("36393f")
                     .setFooter(`Senpai`, xerphos.user.displayAvatarURL)
                      .setThumbnail(`https://cdn.discordapp.com/emojis/493919635985399823.png?v=1`)
                        .setTitle("<:emoji_12:777975013999116298> **Prefixo Alterado**")
                          .addField('Novo Prefixo', `O prefixo do servidor foi alterado para: **${args[1]}**`);
                  
                 message.channel.send(sEmbed);
                
                } else {
                  
                  message.channel.send({
                    embed: {
                        title: `<:emoji_11:777975007120851014>   | ${message.author}, diga o **\`prefixo\`** que deseja **setar**`,
                        color: 0x36393f,
                    }
                })
              }

              } else if(args[0] == "ajuda"){ 

                let XEmbed = new Discord.MessageEmbed()

                .setThumbnail(`https://cdn.discordapp.com/emojis/493919635985399823.png?v=1 `)
                  .setTitle("<:emoji_7:777975000925077526> **Prefixo no Servidor**")
                    .setColor("#36393f")
                       .setFooter(`Senpai `, xerphos.user.displayAvatarURL)
                        .addField('Prefixo',`O **prefixo** do servidor é: **${prefixo}**`)

                message.channel.send(XEmbed)

              }
            } else {

              let HEmbed = new Discord.MessageEmbed()

              .setThumbnail(`https://cdn.discordapp.com/emojis/493919635985399823.png?v=1`)
                .setTitle("<:emoji_7:777975000925077526> **Configuração do Prefixo**")
                  .setColor("#36393f")
                     .setFooter(`Senpai`, xerphos.user.displayAvatarURL)
                      .setDescription(`\`\`\`${prefixo}prefixo set <new>\n${prefixo}prefixo ajuda\`\`\``)
                      
              message.channel.send(HEmbed)
            }
          } else {

        var save = new database.Guilds({_id: message.guild.id})
        save.save()
        }
        
      }).catch(e => {
        console.log('Mongoose Duplicada')
      })

  } else {
    var yEmbed = new Discord.MessageEmbed()
    
    .setColor("#36393f")
    .setDescription(`<a:erro:777261754929381406> | ${message.author}, você não tem **permissão** para executar esse **comando**`)
    message.channel.send(yEmbed)
    }
  }).catch(e => {
    console.log('Mongoose Duplicada')
  })
}