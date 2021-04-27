console.log('[OPEN] > Ligando o Bot...')

const Discord = require("discord.js")
const database = require("./configuração/database.js")
const { MessageEmbed } = require("discord.js")
const client = new Discord.Client();

const xerphos = new Discord.Client({
    autoReconnect: true,
    messageCacheMaxSize: 2024,
    fetchAllMembers: true,
    messageCacheLifetime: 1680,
    disableEveryone: false,
    messageSweepInterval: 1680,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking']
})

const config = require("./configuração/config.json")
const Enmap = require("enmap")
const fs = require("fs")


xerphos.config = config;
xerphos.commands = new Enmap();


xerphos.on("debug", debug => {
    console.log(`Shard ${(xerphos + 1)}: ${debug}`)
})

//Eventos

fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        xerphos.on(eventName, event.bind(null, xerphos));
    });
});

//Utlidades

fs.readdir("./source/Utilidades", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Utilidades/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Música

fs.readdir("./source/Música", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Música/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Informações

fs.readdir("./source/Informações", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Informações/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Owner

fs.readdir("./source/Owner", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Owner/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Moderação

fs.readdir("./source/Moderação", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Moderação/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Minecraft

fs.readdir("./source/Minecraft", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Minecraft/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

//Configuração DataBase

fs.readdir("./source/Configuração", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./source/Configuração/${file}`);
        let commandName = file.split(".")[0];
        xerphos.commands.set(commandName, props);
    });
});

console.log(`[Comandos] > Todos os comandos foram carregados`);

client.on('message', message => {

    if (message.mentions.users.cache.size == 1) {
        if (message.mentions.users.first().id == client.user.id) {
    const embed = new MessageEmbed()
    embed.setTitle(`Olá eu sou um bot Exclusivo do <a:kw2:743757812403798047> __Senpai__ <a:kw2:743757812403798047>   <a:NSFW:743760888825118792>`) // aqui é uma mensagem qnd mencionar o bot ele te fala isso em embed olha
    embed.setDescription(`<a:crystal_TGD:730240340447068190> **prefixo:** __**${prefixo}**__    <a:chu_TGD:716082420839088129> **Suporte** [**__Em desenvolvimento, não entre__**](https://discord.gg/3yHh4sC7)                                   `)
    embed.setThumbnail(message.guild.iconURL({dynamic: true, format: "png", size: 1024}))
    embed.setColor('#36393f');
    embed.setAuthor(client.user.username)
     message.delete()
            message.channel.send(embed)(m => m.delete({timeout: 30000}));
        }
    }
})

xerphos.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content.startsWith("<@746222431991234571>")) {

        try {

            database.Guilds.findOne({ _id: message.guild.id }, function(servro, servidor) {
                if (servidor) {

                    var prefixo
                    prefixo = servidor.prefix

                    //Mensagem de Menção

                    if (!message.guild.me.hasPermission("SEND_MESSAGES")) {
                        console.log(`Sem permissão de enviar mensagens - ${message.guild.name} - ${message.guild.id} - ${message.author.tag}`)
                    }

                    var embedmention = new Discord.MessageEmbed()

                    .setColor("#36393f")
                        .setTitle(` Para Saber Meus Comandos Digite: **\`${prefixo}ajuda\`**`)
                        .setFooter(`Senpaii`, xerphos.user.displayAvatarURL)

                    message.channel.send(embedmention)

                } else if (!servidor) {
                    var save = new database.Guilds({ _id: message.guild.id })
                    save.save()
                }
            }).catch(e => {
                console.log('Mongoose Duplicada')
            })

        } catch (erro) {

            console.log(`Erro no evento de Message-Menção\n${erro}`)

        }
    }
});








xerphos.login(config.token).catch(e => {

    //config.token
    //process.env.TOKEN

    console.log(`Erro em Meu Login - Erro:\n${e}`)

});