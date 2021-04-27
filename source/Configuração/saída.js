const database = require("../../configuração/database.js"); 
const Discord = require("discord.js");

exports.run = async (xerphos, message, args, prefixo) => {

console.log(`Comando saída ${message.guild.name} ${message.guild.id} ${message.author.tag}`)
  
    let razaou = args.slice(0).join(' ')
    let razaod = args.slice(1).join(' ')
  
  
database.Users.findOne({_id: message.author.id}, function (erro, usuario) {
  
    if(usuario.owner || message.member.hasPermission("ADMINISTRATOR")) {

database.Guilds.findOne({_id: message.guild.id}, function (servro, servidor) {

    let server = servidor.byebye
    let = server;
    
    if(server === true) server = "<a:verm_INS_Verified:770003120163389481> Ativado";
    if(server === false) server = "<a:erro:777261754929381406> Desativado";

            if(servidor) {
              if(!razaou.length < 1) {

                if(args[0] == "msg") {

                  if(!razaod.length < 1) {
                    servidor.byebye = true
                    servidor.byebyemsg = args.slice(1).join(' ')
                    servidor.save()
                    
                    let sEmbed = new Discord.MessageEmbed()

                  .setColor("36393f")
                     .setFooter(`Senpai`, xerphos.user.displayAvatarURL)
                      .setTitle("<:emoji_12:777975013999116298>  **Saída setado**")
                        .setDescription(`**Setado Para:**\`\`\`${args.slice(1).join(' ')}\`\`\``)
                  
                 message.channel.send(sEmbed)
                  } else {
                    message.channel.send('<a:erro:777261754929381406> | **Por favor, cite a mensagem de saida que deseja setar**')
                  }
                } else if(args[0] == "remove") {
                  if (servidor.byebye) {
                    servidor.byebye = false
                    servidor.byebyechannel = 'Nenhum'
                    servidor.byebyemsg = 'Nenhuma'
                    servidor.save()
                    message.channel.send(`<a:erro:777261754929381406> | **Mensagem de saída desativada neste servidor**`)
                  } else {
                    message.channel.send('**<a:erro:777261754929381406> | Não há uma mensagem de saída setada neste servidor**')
                  }
                } else if(args[0] == "ajuda") {
                    
                    let mensagem = servidor.byebyemsg
                    let = mensagem;
                    
                    if(mensagem === 'None') mensagem = "Nenhuma"; 
                    if(mensagem === 'Nenhuma') mensagem = "Nenhuma";


                  message.channel.send({
                    'embed': {
                      'title': '<a:seta_SL:777975050678304799> Saída:',
                      'description': `**Mensagem setada:** ${mensagem}\n\n**Como usar:**\`\`\`\n{member} menciona o usuário\n{name} nome do usuário\n{guild} nome do servidor\`\`\`\nStatus: ${server}\nCanal: <#${servidor.byebyechannel}>`,
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
                } else if(args[0] == "canal") {
                
                let guild  = xerphos.guilds.cache.get(message.guild.id)
                let canal = guild.channels.cache.get(args[1]) || guild.channels.cache.find(a=> a.name == args[1]) || message.mentions.channels.first()
                  
                  if(!args[1]){
                    return message.channel.send('<a:erro:777261754929381406> | **Argumento Inválido**')
                   }

                  if(!canal){
                    return message.channel.send('<a:erro:777261754929381406> | **Canal Inválido**')
                  }
                  servidor.byebyechannel = canal.id
                  servidor.save() 
                  message.channel.send(`<a:seta_SL:777975050678304799> | **Canal Definido:** ${canal}`)

                 } else {
                  message.channel.send('<a:erro:777261754929381406> | **Argumento Inválido**')
                }
              } else {
                message.channel.send({
                  'embed': {
                    'title': '<a:seta_SL:777975050678304799> Saída:',
                    'description': `Status: ${server}\n\`\`\`\n${prefixo}saída msg <mensagem de saida>\n${prefixo}saída remove\n${prefixo}saída ajuda\n${prefixo}saída canal \`\`\``,
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
              message.channel.send('<a:erro:777261754929381406> | **Ocorreu um erro ao executar este comando.**')
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