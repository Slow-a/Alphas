const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (client, message, args) => {

    let menuEmbed = new Discord.MessageEmbed()


    .setAuthor(client.user.username, message.author.displayAvatarURL({dynamic : true}))
    .setTitle("BOT - ajuda ")
	.setColor('#00F6EB')
    .setDescription(`**Olá <@${message.author.id}> Sou o Alphas múltiplas funções, reaja pra descobrir**\n\n [Meu servidor de suporte](https://discord.gg/Fk64ERRjsz)\n [Quer me adicionar clique aqui.](https://rouba o bot não, é privado amg)`)
    .addField("<a:pika2:836456523257085964> Meu Desenvolvidor :      :calendar: Criado em :  \n ᵗᵍᵈㅿ『𝒔𝒆𝒏𝒑𝒂𝒊'inf#0176 e 𝕮𝖔𝖋𝖋𝖊𝖊☕#1858       27 de abril de 2020 " ,' \n <a:borboleta:716082421296136253> Meu prefixo nesse servidor: \n `a!` \n \n  ')
    .addField("<a:1_:836461430471262208> *Comandos de Utilitários* - 9 Commands", '<:st:832876660578582548>  Todos meus commando de  Utilitários')
    .addField("<a:2_:836461428927102987> *Comandos de Zoeiras/Social* - 6 Commands", '<:st:832876660578582548>  Todos meus commando de Zoeiras/Social')
    .addField("<a:3_:836461429627289602> *Comandos de administração* - 12 Commands", '<:st:832876660578582548>  Todos meus commando de administração')
    .addField("<a:4_:836461430403629078> *Comandos de Música* - 11 Commands", '<:st:832876660578582548>  Todos meus commando de Tools')
    .addField("<a:5_:836461429540126750> *Comandos de Jogos* - 0 Commands", '<:st:832876660578582548>  Todos meus commando de Jogos')
    .addField("<a:6_:836461429006532660> *Comandos de NSFW* - 6 Commands", '<:st:832876660578582548>  Todos meus commando de NSFW')
	.setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp();
    
	
    
        var embed1 = new Discord.RichEmbed()
        

        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Utilitários comandos")
        .setDescription("Comandos de Utilitários . \n  `a!serverinfo`  \n `a!userinfo` \n `a!avatar` \n `a!sugerir` \n `a!sorteio` \n  `a!quiz` \n `a!profile` \n `a!ping` \n `a!help`  ") 
        .setColor("#00F6EB")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
		.setTimestamp();
		
        var embed2 = new Discord.MessageEmbed()
        

        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Zoeiras/Social commands")
        .setDescription("Comandos de Zoeiras/Social.\n `a!kiss` \n `a!firstword` \n `a!punch` \n `a!ship` \n `a!daily` \n `a!economy` ") 
        .setColor("#bf00ff")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
		.setTimestamp();
        
        
		var embed3 = new Discord.MessageEmbed()
        

        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Comandos de Moderação e administração")
        .setDescription("Comandos Moderação e adiministração. \n `a!addemoji` \n `a!warn` \n `a!clear` \n  `a!ban` \n  `a!autorole`\n `a!kick` \n `a!mute` \n `a!channel` \n `a!unmute` \n `a!role` \n `a!welcome` \n `a!leave` \n `a!counter`") 
        .setColor("#00F6EB")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
		.setTimestamp();
		
		var embed4 = new Discord.MessageEmbed()
        
  
        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Comandos de Música")
        .setDescription("Comandos Música. \n `a!join` \n `a!leave` \n `a!np` \n `a!play` \n `a!queue` \n `a!repeat` \n `a!restart` \n `a!skip` \n `a!stop` \n `a!volume` ") 
        .setColor("#00F6EB")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp();
        
        var embed5 = new Discord.MessageEmbed()
        

        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Jogos comandos")
        .setDescription("Comandos de Jogos . \n Em desenvolvimento...") 
        .setColor("#00F6EB")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp();

        var embed6 = new Discord.MessageEmbed()
        

        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setTitle("Commandos de NSFW")
        .setDescription("Comands de NSFW. \n em desenvolvimento. ")
        .setColor("#00F6EB")
        .setFooter(`Prefixo: a! |Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp();


        
            message.channel.send(menuEmbed).then(msg2 => {

                msg2.react('836461429431205938').then(() => { 
                })

                let VoltarFilter = (reaction, user, ) => reaction.emoji.id === '836461429431205938' && user.id === message.author.id;
                let Voltar = msg2.createReactionCollector(VoltarFilter, { time: 0 });
                Voltar.on('collect', (reaction, user) => { 
                    let Voltar = new Discord.MessageEmbed()
                        .setAuthor(client.user.username, message.author.displayAvatarURL({dynamic : true}))
    .setTitle("BOT - ajuda ")
	.setColor('#00F6EB')
    .setDescription(`**Olá <@${message.author.id}> Sou o Inf múltiplas funções, reaja pra descobrir**\n\n [Meu servidor de suporte](https://discord.gg/Fk64ERRjsz)\n [Quer me adicionar clique aqui.](https://rouba o bot não, é privado amg)`)
    .addField("<a:pika2:836456523257085964> Meu Desenvolvidor :      :calendar: Criado em :  \n ᵗᵍᵈㅿ『𝒔𝒆𝒏𝒑𝒂𝒊'inf#0176 e 𝕮𝖔𝖋𝖋𝖊𝖊☕#1858       27 de abril de 2020 " ,' \n <a:borboleta:716082421296136253> Meu prefixo nesse servidor: \n `a!` \n \n  ')
    .addField("<a:1_:836461430471262208> *Comandos de Utilitários* - 9 Commands", '<:st:832876660578582548>  Todos meus commando de  Utilitários')
    .addField("<a:2_:836461428927102987> *Comandos de Zoeiras/Social* - 4 Commands", '<:st:832876660578582548>  Todos meus commando de Zoeiras/Social')
    .addField("<a:3_:836461429627289602> *Comandos de administração* - 10 Commands", '<:st:832876660578582548>  Todos meus commando de administração')
    .addField("<a:4_:836461430403629078> *Comandos de Música* - 11 Commands", '<:st:832876660578582548>  Todos meus commando de Tools')
    .addField("<a:5_:836461429540126750> *Comandos de Jogos* - 0 Commands", '<:st:832876660578582548>  Todos meus commando de Jogos')
    .addField("<a:6_:836461429006532660> *Comandos de NSFW* - 0 Commands", '<:st:832876660578582548>  Todos meus commando de NSFW')
	.setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp();
                        msg2.edit(Voltar);
                })
                msg2.react('836461429431205938');
                msg2.react('836461430471262208');
                msg2.react('836461428927102987');
                msg2.react('836461429627289602');
                msg2.react('836461430403629078');
                msg2.react('836461429540126750');
                msg2.react('836461429006532660');
            const collector = msg2.createReactionCollector((r, u) => (r.emoji.id === '836461430471262208' || r.emoji.id === '836461428927102987' || r.emoji.id === '836461429627289602' || r.emoji.id === '836461430403629078' ||  r.emoji.id === '836461429540126750' || r.emoji.id === '836461429006532660') && (u.id !== client.user.id && u.id === message.author.id))
            collector.on("collect", (r, u)=>{
                r.users.remove(message.author.id)
                switch (r.emoji.id) {
                case '836461430471262208':
                r.message.edit(embed1)
                break;
                case '836461428927102987': 
                r.message.edit(embed2)
                break;
                case '836461429627289602': 
                r.message.edit(embed3)
                break;
                case '836461430403629078': 
                r.message.edit(embed4)
                break;
                case '836461429540126750':
                r.message.edit(embed5)
                break;
                case '836461429006532660':
                r.message.edit(embed6)
                break;
                

                }
            })
        })
    }

module.exports.help = {
    name: "ajuda"
}

































