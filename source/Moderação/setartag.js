const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if(!args[0]){
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("<:settings:514924323618816021>**Comando:** s!setartag")
        .setColor("#36393f")
        .setImage("https://cdn.discordapp.com/attachments/512727524791287812/514921214871863297/line.png")
        .setThumbnail("https://cdn.discordapp.com/attachments/512727524791287812/514912440765513758/network_1.png")
        .addField("»Uso:", "\`\`s!setartag <@usuario> <tag>\`\`")
        .addField("»Exemplo:", "\`\`s!setartag @ @\`\`"))
        }
                let volte = args[0];
                if (!volte) return;
        

    if (!message.member.hasPermission('ADMINISTRADOR')) return message.reply(new Discord.MessageEmbed()
    .setColor("#36393f")
    .setTimestamp()
    .setDescription("<:cancel:504782695667335178> | Você não tem permissão para executar este comando.")).then(m => m.delete(5000))
    let membro = message.mentions.members.first() || message.guild.members.get(args[0])
    let cargo_id = message.mentions.roles.first().name || args[1]
    if(!membro) return;
    if(!cargo_id) return;
    let cargo = message.guild.roles.cache.find(role => role.id === `${cargo_id}`)
    
    if(membro.roles.has(cargo.id)) return message.channel.send(new Discord.MessageEmbed()
    .setColor("#36393f")
    .setTimestamp()
    .setDescription("<:cancel:504782695667335178> | Este membro ja possui esse cargo")).then(m => m.delete(5000))
    membro.addRole(cargo.id).then(() => {message.channel.send(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/504474789231067138/505157175635869726/price-tag.png")
        .setDescription(`»O cargo: | **__${cargo.name}__** | foi adicionado ao membro: \n\n**__${membro.user.tag}__**`))
    })
        message.delete().catch(O_o=>{}); 
}

