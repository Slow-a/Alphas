const Discord = require("discord.js");
const database = require("../../configuração/database");

module.exports.run = (client, message, args, prefixo) => {

    const mention = message.mentions.channels.first();

    database.Guilds.findOne({ _id: message.guild.id }, function(err, doc) {

        let counter;

        if (!doc.counter) counter = `Status: **Desativado**`;
        else counter = `Status: **Ativado**`;

        let counterchannel;

        if (doc.counter.channel === 'geral') {
            counterchannel = `Canal do **contador de membros**:\n ${doc.counter.channel}`;
        } else {
            counterchannel = `Canal do **contador de membros**:\n <#${doc.counter.channel}>`;
        }

        const n0 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303861231626");
        const n1 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985560260618");
        const n2 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985565110273");
        const n3 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161302594420779");
        const n4 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263895085077");
        const n5 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263827976224");
        const n6 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825264880877680");
        const n7 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303395401790");
        const n8 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161304083267595");
        const n9 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263953936416");

        let membros =  `${client.guilds.cache.get(message.guild.id).memberCount.toString()}`;
        let counterEmoji = membros.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
        let countermsg;

        if (doc.counter.message === 'Temos {membros} no servidor') {
            countermsg = `Mensagem do counter:\n **(${doc.counter.message})**`;
        } else {
            contermsg = `Mensagem do counter:\n ${doc.counter.message}`.replace("{membros}", counterEmoji)
        }

        const info = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`Menu de \`configurações\` de \`contador de membros\` do servidor!
          
          ${counter}
          ${counterchannel}
          ${countermsg}`)
            .setFooter(`Comando utilizado por: ${message.author.tag}`, message.author.avatarURL)
            .setTimestamp()

        if (!args[0]) return message.channel.send(info);

        switch (args[0]) {

            case 'set':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!mention)
                     return message.channel.send(info);

                if (mention.id === doc.counter.channel) {
                     return message.channel.send(`\`${message.author.tag}\` o canal \`mencionado\` ja está setado como \`contador de membros\`.`);
                } else {

                    doc.counter.channel = mention.id;
                    doc.save();

                    message.channel.send(`\`${message.author.tag}\` você setou o canal ${mention} como \`contador de membros\`.`);
                    break;
                }

            case 'help':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);
                     
                    const help = new Discord.MessageEmbed()
                    .setAuthor(
                      `${message.guild.name} - Sistema de Contador`,
                      message.guild.iconURL({ dynamic: true })
                    )
                    .setColor('#36393f')
                    .setFooter(
                      `Comando requisitado por ${message.author.username}`,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                    .addFields(
                      {
                        name: "Canal setado atualmente",
                        value:
                        doc.counter.channel == "null"
                            ? "Nenhum canal setado atualmente"
                            : `<#${doc.counter.channel}>`,
                      },
                      {
                        name: "Mensagem setada",
                        value: `${
                            doc.counter.message == "{contador}"
                            ? "Nenhuma mensagem setada"
                            : `\`\`\`diff\n- ${doc.counter.message}\`\`\``
                        }`,
                      },
                      {
                        name: "Necessário",
                        value: `Para setar em EMOJI é necessário usar **{membros}** na mensagem do sistema.`,
                      },
                      {
                        name: "Status do Sistema",
                        value: `No momento o sistema se encontra **${
                            doc.counter.enabled == true ? "ativado" : "desativado"
                        }**`,
                      }
                    );

                    message.channel.send(help);
                   break;

            case 'msg':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (doc.counter.channel === 'geral') {
                    return message.channel.send(`\`${message.author.tag}\` nenhum \`canal\` foi definido como \`contador de membros\` para você utilizar está função!`);
                } else {

                    doc.counter.message = args.slice(1).join(' ');
                    doc.save();

                    const n0 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303861231626");
                    const n1 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985560260618");
                    const n2 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985565110273");
                    const n3 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161302594420779");
                    const n4 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263895085077");
                    const n5 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263827976224");
                    const n6 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825264880877680");
                    const n7 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303395401790");
                    const n8 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161304083267595");
                    const n9 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263953936416");

                    let membros =  `${client.guilds.cache.get(message.guild.id).memberCount.toString()}`;
                    let counterEmoji = membros.split('').map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i]).join('');
                    client.guilds.cache.get(message.guild.id).channels.cache.get(doc.counter.channel).setTopic(args.slice(1).join(' ').replace("{membros}", `${counterEmoji}`));
                    message.channel.send(`\`${message.author.tag}\` você definiu uma mensagem para o \`contador de membros\` com sucesso!`);
                    break;
            }

            case 'on':

                    if (doc.counter.enabled === true) {
                        return message.channel.send(`\`${message.author.tag}\` o status de \`contador de membros\` ja está ativado!`);
                    } else {

                        doc.counter.enabled = true;
                        doc.save().then(async () => {
                            await message.channel.send(`\`${message.author.tag}\` o status do sistema de \`contador de membros\` do servidor foi alterado para \`on\`.`);
                        })
                        break;
                    }
                    case 'off':

                    if (doc.counter.enabled === false) {
                        return message.channel.send(`\`${message.author.tag}\` o status de \`contador de membros\` ja está desativado!`);
                    } else {

                        doc.counter.enabled = false;
                        doc.save().then(async () => {
                            await message.channel.send(`\`${message.author.tag}\` o status do sistema de \`contador de membros\` do servidor foi alterado para \`off\`.`);
                        })
                        break;
                    }

            case 'remover':

                if (!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES'))
                    return message.channel.send(`\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`);

                if (!doc.counter) {
                    return message.channel.send(`\`${message.author.tag}\` nenhum canal está setado como \`contador de membros\` para você remover!`);
                } else {

                    client.guilds.cache.get(message.guild.id).channels.cache.get(doc.counter.channel).setTopic('');

                    doc.counter = false;
                    doc.counter.channel = 'Nenhum';
                    doc.counter.message = 'Nenhuma';
                    doc.save();

                    message.channel.send(`\`${message.author.tag}\` você retirou o \`contador de membros\` do servidor!`);
                    break;
                }

                    default:
                    message.channel.send(`\`${message.author.tag}\` configuração \`${args.slice(0).join(' ')}\` desconhecida, tente usar: \`channel, remover, msg, on, off ou help\`.`)
        }
    })
}

exports.help = {
    name: 'counter',
    aliases: ['counter'],
    usage: "counter help",
    description: "Define o contador de membros em um canal",
    category: "Configuração"
}