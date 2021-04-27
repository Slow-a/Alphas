const Discord = require("discord.js");
const database = require("../../configuração/database.js");

exports.run = async (xerphos, message, args, prefixo) => {

    console.log(`Comando config ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

    database.Guilds.findOne({ _id: message.guild.id }, function (erro, servidor) {

        let welcome = servidor.welcome
        let = welcome   
        if (welcome === true) welcome = "<a:verm_INS_Verified:770003120163389481>"
        if (welcome === false) welcome = "<a:erro:777261754929381406>";

        let saida = servidor.byebye
        let = saida
        if (saida === true) saida = "<a:verm_INS_Verified:770003120163389481>"
        if (saida === false) saida = "<a:erro:777261754929381406>";

        let antInv = servidor.ConfirmeInvite
        let = antInv
        if (antInv === true) antInv = "<a:verm_INS_Verified:770003120163389481>"
        if (antInv === false) antInv = "<a:erro:777261754929381406>";

        let autorole = servidor.autorole
        let = autorole
        if (autorole === true) autorole = "<a:verm_INS_Verified:770003120163389481>"
        if (autorole === false) autorole = "<a:erro:777261754929381406>";


        message.channel.startTyping()

        var embedConfig = new Discord.MessageEmbed()

            .setTitle('<:a_ue_pda:770495070226087936> Minhas Configurações Disponíveis')
            .setThumbnail(xerphos.user.displayAvatarURL)
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .addField(`**Ant-Invite ${antInv}**`, `Use \`${prefixo}ant-invite\`, \nbloqueador de convites de outros **__servidores__**.`)
            .addField(`**Welcome ${welcome}**`, `Use \`${prefixo}welcome\`, \njeito para configurar a mensagem de **__bem-vindo__**`)
            .addField(`**Saída ${saida}**`, `Use \`${prefixo}saida\`, \njeito para configurar a mensagem de **__saída__**`)
            .addField(`**Autorole ${autorole}**`, `Use \`${prefixo}autorole\`, \nmodo de configurar o **__cargo__** que o membro vai receber quando entrar no **__servidor__**`)
            .addField(`**Contador ${contador}**`, `Use \`${prefixo}contador help\`,\nmodo de configurar o **__contador__** que vai aparece no Tópico do **__servidor__**`)
            .addField(`**Prefixo - Atual \`[${servidor.prefix}]\`**`, `Use \`${prefixo}prefixo\`, para alterar meu prefixo sem seu **__servidor__**`)
            .setColor('#36393f')

        message.channel.stopTyping()
        message.channel.send(embedConfig)

    }).catch(e => {
        console.log('Mongoose Duplicada')
    })
}