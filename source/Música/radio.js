const Discord = require("discord.js");
const config = require("../../configuração/radio.json")
var opusscript = require("opusscript");

exports.run = async(client, message, args) => {
    if(args[0] == null) {
        message.channel.send(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setAuthor("Senpai", message.client.user.displayAvatarURL)
        .setTimestamp()
        .setTitle("<a:erro:777261754929381406> Você não definiu nenhuma rádio, digite `xh!radio list` para saber todas as rádios."))
    }
    if(message.content == `s!radio list`) {
        var embed = new Discord.MessageEmbed();
        embed.setColor("#36393f");
        let brfliter = config.filter(a=>a.pais =="Brasil")
        let br = brfliter.map(b=>`\`${b.id}\` ❯ ${b.name}`)
        let usfliter = config.filter(a=>a.pais=="EUA")
        let us = usfliter.map(b=>`\`${b.id}\` ❯ ${b.name}`)
        let poloniafliter = config.filter(a=>a.pais=="Polônia")
        let polonia = poloniafliter.map(b=>`\`${b.id}\` ❯ ${b.name}`)
        let françafliter = config.filter(a=>a.pais=="França")
        let frança = françafliter.map(b=>`\`${b.id}\` ❯ ${b.name}`)
        let croaciafliter = config.filter(a=>a.pais=="Croacia")
        let croacia = croaciafliter.map(b=>`\`${b.id}\` ❯ ${b.name}`)
        let embedlist = new Discord.MessageEmbed()
        var desc = "";
        config.forEach(r => desc += `${r.id}. ${r.name}\n`);
        embed.setColor("#36393f")
        embed.setThumbnail("https://cdn.discordapp.com/attachments/512684274122752000/529046024065646594/microphone.png")
        embed.setAuthor("senpai", message.client.user.displayAvatarURL)
        embed.setDescription(`<a:okay:512392301037748251> Lista de estações/rádios\n
        <a:1_:745161302992879616> Estações Brasileiras
        <a:2_:745161302913318963> Estações Americanas
        <a:3_:745161302594420779>Estações da Polônia
        <a:4_:745161303617830980> Estações da França
        <a:5_:745161302695215137> Estações da Croacia
        <a:6_:745161303831871499> Clique nas reações para ver cada estação/rádio

Alguma rádio não está pegando? Informe o criador do Bot: **乡ᵗᵍᵈㅿ『𝒔𝒆𝒏𝒑𝒂𝒊'inf#0176**`);
message.channel.send(embed).then(msg=>{
msg.react('745161302992879616').then(()=>{
    msg.react('745161302913318963').then(()=>{
        msg.react('745161302594420779').then(()=>{
            msg.react('745161303617830980').then(()=>{
                msg.react('745161302695215137').then(()=>{
                    msg.react('745161303831871499')
                    })
                })
            })
    })
})
            const filter = (reaction,user)=> (reaction.emoji.id==="745161302992879616"||reaction.emoji.id==="745161302913318963"||reaction.emoji.id==="745161302594420779"||reaction.emoji.id==="745161303617830980"||reaction.emoji.id==="745161302695215137"||reaction.emoji.id==="745161303831871499")&&user.id === message.author.id
            let collector = msg.createReactionCollector(filter, {time: 60000});
            collector.on('collect', async react=>{
                if(react.emoji.id=="745161302992879616"){
                    embedlist.setColor("#36393f")
                    embedlist.setDescription(`<a:1_:745161302992879616> Estações Brasileiras
                    ${br.join('\n')}`)
                    msg.edit(embedlist)
                    react.remove(message.author.id)
                }else if(react.emoji.id=="745161302913318963"){
                    embedlist.setColor("#36393f")
                    embedlist.setDescription(`<a:2_:745161302913318963> Estações Americanas
                    ${us.join('\n')}`)
                    msg.edit(embedlist)
                    react.remove(message.author.id)
                }else if(react.emoji.id=="745161302594420779"){
                    embedlist.setColor("#36393f")
                    embedlist.setDescription(`<a:3_:745161302594420779> Estações da Polonia
                    ${polonia.join('\n')}`)
                    msg.edit(embedlist)
                    react.remove(message.author.id)
                }else if(react.emoji.id=="745161303617830980"){
                    embedlist.setColor("#36393f")
                    embedlist.setDescription(`<a:4_:745161303617830980 Estações da França
                    ${frança.join('\n')}`)
                    msg.edit(embedlist)
                    react.remove(message.author.id)
                }else if(react.emoji.id=="745161302695215137"){
                    embedlist.setColor("#36393f")
                    embedlist.setDescription(`<a:5_:745161302695215137> Estações da Croacia
                    ${croacia.join('\n')}`)
                    msg.edit(embedlist)
                    react.remove(message.author.id)
                }else if(react.emoji.id=="745161303831871499"){
                    msg.edit(embed)
                    react.remove(message.author.id)
                }
            })
        })
    } else {
        var radio = {};
        var zn = false;
        config.forEach(r => {
            if(args[0] == r.id) {
                radio = r;
                zn = true;
            }
        });
        var vChannel = message.member.voiceChannel;
        if(!zn && args[0] == Number) return message.channel.send("<a:erro:777261754929381406> Número de rádio/estação errado!")
        if (args[0] && !message.member.voiceChannel) return message.channel.send("<a:erro:777261754929381406> Não é possível conectar sem você estar em um canal!");
            if (message.guild.member(client.user).voiceChannel != vChannel) {
                vChannel.join().then(con => {
                con.playStream(radio.url)
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#36393f")
                .setTitle(`<a:music:512400492836683791> Tocando \`${radio.name}\``))
                })
            }
            if(message.content == 'xh!radio leave') {
                if (message.guild.member(client.user).voiceChannel) {
                    message.member.voiceChannel.leave()
                  message.channel.send(new Discord.MessageEmbed()
                  .setColor("#36393f")
                  .setTitle(`<a:verm_INS_Verified:770003120163389481> Estou saindo do canal: \`${message.member.voiceChannel.name}\``))
                };
            }
        }
    }
