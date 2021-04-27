const Discord = require("discord.js");
const database = require("../../configuração/database.js"); 

exports.run = async (client, message, args, prefixo) => {

console.log(`Comando ant-invite ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

let razaou = args.slice(0).join(' ')
let razaod = args.slice(1).join(' ')

database.Users.findOne({_id: message.author.id}, function (erro, usuario) {
  
if(usuario.owner || message.member.hasPermission("ADMINISTRATOR")) {

database.Guilds.findOne({_id: message.guild.id}, function (servro, servidor) {

          if(servidor) {
            if(!razaou.length < 1) {
                if(args[0] == "set") {
                    if(!razaod.length < 1) {

                    let guild  = client.guilds.cache.get(message.guild.id)
                    let canal = guild.channels.cache.get(args[1]) || guild.channels.cache.find(a=> a.name == args[1]) || message.mentions.channels.first()
                    
                      if(!canal){
                        return message.channel.send('<:cancel:504782695667335178> | **Canal Inválido**')
                      }
                      servidor.inviteChannels.push(canal.id)
                      servidor.ConfirmeInvite = true
                      servidor.save() 
                      message.channel.send(`<:shuffle:508114778695139348> | **Canal Definido:** ${canal}`)
    
                } else {
                  message.channel.send(`<:cancel:504782695667335178> | ${message.author}, Use: **\`${prefixo}ant-invite [canal] <ch>\`**`)
                }
               if(args[0] == "remove") { 
                if(servidor.antinvite) {
                  servidor.antinvite = false
                  servidor.inviteChannels = []
                  servidor.ConfirmeInvite = false
                  servidor.save()
                  message.channel.send(`<a:loadbotw:777260216931844106> | ${message.author}, **\`Ant-Invite\`** desativado neste **servidor**`)
                } else {
                  message.channel.send(`<a:ferrament:777259483767898122> | ${message.author}, Não há nenhum **\`Ant-Invite\`** setado neste **servidor**`)
                }

    let server = servidor.ConfirmeInvite
    let = server;
    
    if(server === false) server = "Nenhum";
    if(server === true) server = `${servidor.inviteChannels.map(a=> `<#${a}>`).join(',')}`;

    let stat = servidor.ConfirmeInvite
    let = stat;
    
    if(stat === true) stat = "<a:NSFW:743760888825118792> Ativado";
    if(stat === false) stat = "<a:erro:777261754929381406> Desativado";
             
    //**<a:okay:512392301037748251> Canais: ${server}


              } else if(args[0] == "on") {

                if(servidor.antinvite === true) return message.channel.send(` <:rosinha_TGD:730532537453248523> | ${message.author}, **\`Ant-Invite\`** já está ativado neste **servidor**`);

                servidor.antinvite = true
                servidor.save()
                message.channel.send(` <:rosinha_TGD:730532537453248523> | ${message.author}, **\`Ant-Invite\`** ativado neste **servidor**`)
                
              } else {
                message.channel.send(`<a:erro:777261754929381406> | ${message.author}, argumento **inválido**`)
              }
            } else {
                message.channel.send(`<a:crystal_TGD:730240340447068190> | ${message.author}, Use: **\`${prefixo}ant-invite [ajuda]\`** para saber meus **parâmetros**`)
            }
          } else if(args[0] == "ajuda") {
          message.channel.send({
          'embed': {
           'title': '<:rosinha_TGD:730532537453248523> Ant-Invite',
           'description': `**<a:moedinha_TGD:730532537419694140> Como Usar:**\`\`\`${prefixo}ant-invite [on] ativa o Ant-Invite\n${prefixo}ant-invite [remove] remove o Ant-Invite\`\`\`\nStatus: ${stat}`,
           'color': 0x36393f,
           'timestamp': new Date(),
           'footer': {
             'icon_url': message.author.displayAvatarURL,
             'text': message.author.username
           },
           'thumbnail': {
             'url': client.user.displayAvatarURL
           }
         }
       })
      } else {
        message.channel.send({
          'embed': {
            'title': '<:rosinha_TGD:730532537453248523> Ant-Invite',
            'description': `**<a:moedinha_TGD:730532537419694140> Como Usar:**\`\`\`${prefixo}ant-invite [on] ativa o Ant-Invite\n${prefixo}ant-invite [remove] remove o Ant-Invite\`\`\`\nStatus: ${stat}`,
            'color': 0x36393f,
            'timestamp': new Date(),
            'footer': {
              'icon_url': message.author.displayAvatarURL,
              'text': message.author.username
            },
            'thumbnail': {
              'url': client.user.displayAvatarURL
            }
          }
        })
      
            var save = new database.Guilds({_id: message.guild.id})
            save.save()
            }
        
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
})
}
