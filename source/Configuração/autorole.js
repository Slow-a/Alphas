const database = require("../../configuração/database.js"); 
const Discord = require("discord.js")

exports.run = async (xerphos, message, args, prefixo) => {

console.log(`Comando autorole ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

let razaou = args.slice(0).join(' ')
let razaod = args.slice(1).join(' ')

database.Users.findOne({_id: message.author.id}, function (erro, usuario) {
  
if(usuario.owner || message.member.hasPermission("ADMINISTRATOR")) {

database.Guilds.findOne({_id: message.guild.id}, function (servro, servidor) {

          if(servidor) {
            if(!razaou.length < 1) {
                if(args[0] == "set") {

                if(!razaod.length < 1) {

                if (message.mentions.roles.size > 0) {
                if (message.guild.roles.get(message.mentions.roles.first().id).position < message.guild.members.get(xerphos.user.id).highestRole.position) {
                      servidor.autorole = true
                      servidor.autoroleid = message.mentions.roles.first().id
                      servidor.save()
                      message.channel.send(`<a:sininho_TGD:713744818102206484> | **Autorole setado para:** ${message.mentions.roles.first().name}`)
                    } else {
                      message.channel.send('<a:erro:777261754929381406> | **O cargo deve estar abaixo do meu**')
                    }
                  } else {
                    message.channel.send('<a:fofs3_TGD:724622711971774505> | **Por favor, mencione o cargo que deseja setar**')
                  }
                } else {
                  message.channel.send(`<a:moedinha_TGD:730532537419694140> | ${message.author}, Use: **\`${prefixo}autorole set [role]\`**`)
                }
              } else if(args[0] == "remove"){ 
                if (servidor.autorole) {
                  servidor.autorole = false
                  servidor.autoroleid = 'Nenhum'
                  servidor.save()
                  message.channel.send(`<a:loadbotw:777260216931844106> | ${message.author}, **\`Autorole\`** desativado neste **servidor**`)
                } else {
                  message.channel.send(`**<a:erro:777261754929381406> | ${message.author}, não há nenhum **\`Autorole\`** setado neste **servidor**`)
                }
              } else if(args[0] == "ajuda") {
                message.channel.send({
                  'embed': {
                    'title': '<a:sininho_TGD:713744818102206484> Autorole:',
                    'description': `**Cargo setado:** <@&${servidor.autoroleid}>`,
                    'color': 0x36393f,
                    'timestamp': new Date(),
                    'footer': {
                      'icon_url': message.author.displayAvatarURL,
                      'text': message.author.username
                    },
                    'thumbnail': {
                      'url': xerphos.user.displayAvatarURL
                    }
                  }
                })
              } else {
                message.channel.send(`<a:erro:777261754929381406> | ${message.author}, argumento **Inválido**`)
              }
            } else {
              message.channel.send({
                'embed': {
                  'title': '<a:sininho_TGD:713744818102206484> Autorole:',
                  'description': `\`\`\`\n${prefixo}autorole set <menção do cargo>\n${prefixo}autorole remove\n${prefixo}autorole ajuda\`\`\``,
                  'color': 0x36393f,
                  'timestamp': new Date(),
                  'footer': {
                    'icon_url': message.author.displayAvatarURL,
                    'text': message.author.username
                  },
                  'thumbnail': {
                    'url': xerphos.user.displayAvatarURL
                  }
                }
              })
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