const database = require("../../configuração/database.js");
const Discord = require("discord.js");

exports.run = async (xerphos, message, args, prefixo) => {

  console.log(`Comando welcome ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

  let razaou = args.slice(0).join(' ')
  let razaod = args.slice(1).join(' ')

  database.Users.findOne({ _id: message.author.id }, function (erro, usuario) {

    if (usuario.owner || message.member.hasPermission("ADMINISTRATOR")) {

      database.Guilds.findOne({ _id: message.guild.id }, function (servro, servidor) {

        let server = servidor.welcome
        let = server;

        if (server === true) server = "<a:verm_INS_Verified:770003120163389481> Ativado";
        if (server === false) server = "<a:erro:777261754929381406> Desativado";

        if (servidor) {
          if (!razaou.length < 1) {

            if (args[0] == "msg") {
              if (!razaod.length < 1) {
                servidor.welcome = true
                servidor.welcomemsg = args.slice(1).join(' ')
                servidor.save()
                let sEmbed = new Discord.MessageEmbed()

                  .setColor("36393f")
                  .setFooter(`Senpai`, xerphos.user.displayAvatarURL)
                  .setTitle("<a:kw2:777975046487539742> **Welcome setado**")
                  .setDescription(`**Setado Para:**\`\`\`${args.slice(1).join(' ')}\`\`\``)

                message.channel.send(sEmbed)

              } else {
                message.channel.send('<a:erro:777261754929381406> | **Por favor, cite a mensagem de entrada que deseja setar**')
              }
            } else if (args[0] == "remove") {
              if (servidor.welcome) {
                servidor.welcome = false
                servidor.welcomechannel = 'Nenhum'
                servidor.welcomemsg = 'Nenhuma'
                servidor.save()
                message.channel.send(`<:desligado:530515719406878720> | **Welcome desativado neste servidor**`)
              } else {
                message.channel.send('**<a:erro:777261754929381406> | Não há um welcome ativado neste servidor**')
              }
            } else if (args[0] == "ajuda") {

              message.channel.send({
                'embed': {
                  'title': '<a:verm_INS_Verified:770003120163389481> Welcome',
                  'description': `**Mensagem Setada:** ${servidor.welcomemsg}\n\n**Como usar:**\`\`\`\n{member} menciona o usuário\n{name} nome do usuário\n{users} quantidade de users ao entrar\n{guild} nome do servidor\`\`\`\nStatus: ${server}\nCanal: <#${servidor.welcomechannel}>`,
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

            } else if (args[0] == "canal") {

              let guild = xerphos.guilds.cache.get(message.guild.id)
              let canal = guild.channels.cache.get(args[1]) || guild.channels.cache.find(a => a.name == args[1]) || message.mentions.channels.first()

              if (!args[1]) {
                return message.channel.send('<a:erro:777261754929381406> | **Argumento Inválido**')
              }

              if (!canal) {
                return message.channel.send('<a:erro:777261754929381406> | **Canal Inválido**')
              }
              servidor.welcomechannel = canal.id
              servidor.save()
              message.channel.send(`<a:verm_INS_Verified:770003120163389481> | **Canal Definido:** ${canal}`)

            } else {
              message.channel.send('<a:erro:777261754929381406> | **Argumento Inválido**')
            }

          } else {

            message.channel.send({
              'embed': {
                'title': '<a:verm_INS_Verified:770003120163389481> Welcome',
                'description': `Status: ${server}\n\`\`\`\n${prefixo}welcome msg <mensagem de entrada>\n${prefixo}welcome remove\n${prefixo}welcome ajuda\n${prefixo}welcome canal <canal>\`\`\``,
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
          var save = new database.Guilds({ _id: message.guild.id })
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

