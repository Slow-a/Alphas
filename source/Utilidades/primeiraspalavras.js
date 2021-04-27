const Discord = require('discord.js');
var Jimp = require("jimp") 

exports.run = (client, message, args) => {
    if(!args[0]){
        message.channel.send(new Discord.MessageEmbed()
        .setDescription("<a:ferrament:777259483767898122>**Comando:** s!primeiraspalavras")
        .setColor("#36393f")
        .setImage("https://cdn.discordapp.com/attachments/512727524791287812/514921214871863297/line.png")
        .setThumbnail("https://cdn.discordapp.com/attachments/512727524791287812/514912440765513758/network_1.png")
        .addField("<:st:832876660578582548>Uso:", "\`\`s!primeiraspalavras <mensagem>\`\`")
        .addField("<:st:832876660578582548>Exemplo:", "\`\`s!primeiraspalavras Paum\`\`"))
        }
                let volte = args[0];
                if (!volte) return;
        

{
if(message.content.split(' ').slice(1).join(' ').length > 50) {
    message.channel.send(new Discord.MessageEmbed()
    .setColor("#36393f")
    .setDescription('<a:erro:777261754929381406>| Você ultrapassou o limite de 50 caracteres.')).then(m => m.delete(5000))
} else {
        var authorMessage = message
        message.channel.send(new Discord.MessageEmbed()
        .setColor("#36393f")
        .setDescription('<:clock:505050143284789268> | Aguarde...')).then(m => m.delete(5000)).then(message => {
    Jimp.read(`http://i.imgur.com/xXUtLqH.png`, function (err, image) {
    if (err) message.channel.send(new Discord.MessageEmbed()
    .setColor("#36393f")
    .setDescription('<a:erro:777261754929381406> | Ocorreu um erro ao criar a imagem.')).then(m => m.delete(5000))
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
    image.print(font, 11, 13, authorMessage.content.split(' ').slice(1).join(' ')[0] + '... ' + authorMessage.content.split(' ').slice(1).join(' ')[0] + '...', 400)
    image.print(font, 19, 290, authorMessage.content.split(' ').slice(1).join(' '), 320)
    var aguardeMessage = message
    image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        message.channel.send(``)
    message.channel.sendFile(buffer, 'imagem.png', '🖼 | ').then(async msg => {
        await msg.react('❌')
      
        const DeleteFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
          const deletee = msg.createReactionCollector(DeleteFilter);

      
deletee.on('collect', async bot => {
       await msg.delete()

    })
}).then(message => {
        aguardeMessage.delete()
    })
    })
    })
    })})
    
}

}
}
