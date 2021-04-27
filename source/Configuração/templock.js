const Discord = module.require("discord.js");
const ms = require("ms");

module.exports = {
    name: "templock",
    description: "Iniciar um bloqueio cronometrado em um canal.",
    run: async(client, message, args) => {
        const time = args.join(" ");
        if (!time) {
        return message.channel.send("**Insira um período de tempo válido em: `Segundos`,` Minutos` ou `Horas`**")
        }
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send(`**você é fraco, lhe falta permissões de \`Gerenciar Canais\` para usar este comando.**`)
        }
        message.channel.overwritePermissions([
            {
               id: message.guild.id,
               deny : ['SEND_MESSAGES'],
            },
           ],);
           const embed = new Discord.MessageEmbed()
           .setTitle("Atualizações de Canais")
           .setDescription(`:lock: ${message.channel} foi trancado por \`${time}\`.`)
           .setColor("#36393f");
           message.channel.send(embed)

           let time1 = (`${time}`)
           setTimeout(function(){
           message.channel.overwritePermissions([
               {
               id: message.guild.id,
               null: ['SEND_MESSAGES'],
               },
            ],);
           const embed2 = new Discord.MessageEmbed()
           .setTitle("Atualizações de Canal")
           .setDescription(`:unlock: O canal ${message.channel} foi destracado em após \`${time}\`.`)
           .setColor("#36393f");
           message.channel.send(embed2);
        }, ms(time1));
        message.delete();
        
        let logchannel = message.guild.channels.cache.find(x => x.id = '831389681622319135');
        if  (!logchannel){
        message.channel.send({embed})
        }else{
        client.channels.cache.get(logchannel.id).send({embed});
        };
    }
}