const Discord = require('discord.js');
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args) => {

        avatar = message.author.avatarURL

    moment.locale("pt-BR")
    let online = message.guild.members.cache.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.cache.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.cache.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.cache.filter(a => a.presence.status == "offline").size;
    let bot = message.guild.members.cache.filter(a => a.user.bot).size;
    let totalmembros = message.guild.memberCount;
    let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;
    let cargos = message.guild.roles.cache.map(a => a).join(", ")
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor("#36393f")
        .setDescription(`<:st:832876660578582548> Informações do servidor \`\`${message.guild.name}\`\``)
        .addField('<a:kw2:777975046487539742> Dono:', `<@${message.guild.owner.id}>`)
        .addField('<:st:832876660578582548> Criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("<:st:832876660578582548> ID:", message.guild.id)
        .addField(`<:st:832876660578582548> Membros: (${totalmembros})`, `<:on:832879091941507082> Online: \`\`${online}\`\`\n<:ausente:832879449024364584> Ausente: \`\`${ausente}\`\`\n<:ocupado:832878848966262834> Ocupado: \`\`${ocupado}\`\`\n<:off:832879951170240542> Offline: \`\`${offline}\`\`\n<a:ferrament:777259483767898122>Bots: \`\`${bot}\`\``)
        .addField(`<:st:832876660578582548> Canais: ${canaistexto+canaisvoz}`, `Texto: \`\`${canaistexto}\`\`\n Voz: \`\`${canaisvoz}\`\``)
        .addField(`<:st:832876660578582548> Você entrou aqui em:`, moment(message.member.joinedAt).format(`LLLL`))
        .addField(`<:st:832876660578582548> Entrei aqui em:`, moment(client.user.joinedAt).format(`LLLL`))
        .addField(`<:st:832876660578582548> Cargos:`, `\`\`${message.guild.roles.cache.size}\`\``)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(embed)
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo", "infoserver"]
    }
