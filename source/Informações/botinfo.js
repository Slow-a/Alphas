const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
const os = require('os')
const cpuStat = require("cpu-stat");
const database = require("../../configuração/database.js"); 

module.exports.run = (client, message, args, prefixo) => {
        let bicon = client.user.displayAvatarURL;
        let duration = moment.duration(client.uptime).format('D [d], H [h], m [m], s [s]');
        let botembed = new Discord.MessageEmbed()
        avatar = message.author.avatarURL
        moment.locale("pt-BR")
        cpuStat.usagePercent(function(err, percent, seconds) {
          if (err) {
            return console.log(err);
          }

        const embed = new Discord.MessageEmbed()
          
          .setAuthor("Xerphos", message.client.user.displayAvatarURL)
          .setFooter(`${message.author.tag}`, message.author.avatarURL)
          .setColor("#a32aff", true)
          .addField("<a:kw2:777975046487539742>**» Dono:**", "<@743339858965168221>", true)
          .addField("<:motivo:767649835029364736>**» Data de Criação:**", `\`\`\`fix\n• 14/07/2018\`\`\``, true)
          .addField("<:relogio:767651996748087326>**» Servidores:**", `\`\`\`fix\n• ${client.guilds.cache.size}\`\`\``, true)
          .addField("<a:aaaw:767648312891277369>**» Usuários:**", `\`\`\`fix\n• ${client.users.cache.size}\`\`\``, true)
          .addField("<:canais:767651996714926080>**» Canais:**", `\`\`\`fix\n• ${client.channels.cache.size}\`\`\``, true)
          .addField("<:relogio:767651996748087326>**» Uptime:**",`\`\`\`fix\n• ${duration}\`\`\``, true)
          .addField("<:relogio:767651996748087326>**» Latência:**",`\`\`\`fix\n• ${Math.round(client.ping)}ms\`\`\``, true)
          .addField("<:js:767651996755820584>**» Versão:**", "\`\`\`fix\n• 4.0a\`\`\`", true)
          .addField("<:motivo:767649835029364736>**» Prefixo:**", `\`\`\`fix\n• ${prefixo}\`\`\``, true)
          .addField("<:motivo:767649835029364736>**» Uso da CPU:**", `\`\`\`fix\n• ${percent.toFixed(2)}%\`\`\``, true)
          .addField("<:motivo:767649835029364736>**» Sistema:**", "\`\`\`fix\n• x64\`\`\`", true)
          .addField("<a:1_:745161302992879616>**» Meus Links:**", `<a:seta_SL:755733782266380340> [[Convite]](https://discordapp.com/api/oauth2/authorize?client_id=&permissions=8&scope=bot)\n<a:seta_SL:755733782266380340> [[Suporte]](https://discord.gg/DueSXfT9)`)
          message.channel.send(embed).then(async msg => {
            await msg.react('745161302992879616')
          
            const DeleteFilter = (reaction, user) => reaction.emoji.name === '745161302992879616' && user.id === message.author.id;
              const deletee = msg.createReactionCollector(DeleteFilter);

          
deletee.on('collect', async bot => {
           await msg.delete()

        })
})
        })
    }

    module.exports.config = {
        name: "botinfo",
        aliases: ["botinfo"]
        }