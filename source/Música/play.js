const ytdl = require("ytdl-core")
const YouTube = require('simple-youtube-api')
const youtube = new YouTube('AIzaSyA1FovTCCIbyYDbWuMu28_Yoa5mBLd6UkA')
const fetchVideoInfo = require('youtube-info')
const Discord = require("discord.js")
const lista = require('../../configuração/queue.js')

exports.run =  async (xerphos, message, args, prefixo) => {

console.log(`Comando play ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

const voiceChannel = message.member.voiceChannel;
var serverQueue = lista.queue.get(message.guild.id);

if(serverQueue) {
    if(serverQueue.radio == true)  lista.queue.delete(message.guild.id);
        if(voiceChannel !== message.guild.members.get(xerphos.user.id).voiceChannel) return message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> | ${message.author}, conecte-se ao canal de **voz** que eu estou conectado para **prosseguir**`,
            color: 0x36393f,
        }
    })
}

if(!args[0]) return message.channel.send({
    embed: {
        description: `<a:erro:777261754929381406> | ${message.author}, insira o **NOME** ou a **URL** da música desejada`,
        color: 0x36393f,
    
    }
}).then(msg => msg.delete(5000))

var searchString = args.slice(0).join(' ')
var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

		if(!voiceChannel) return message.channel.send({
            embed: {
                description: `<a:erro:777261754929381406> | ${message.author}, conecte-se a um canal de **voz**`,
                color: 0x36393f,
            
            }
        }).then(msg => {
            msg.delete(5000)
        })

var permissions = voiceChannel.permissionsFor(message.client.user);

		if(!permissions.has('CONNECT')) {
			message.channel.send({
                embed: {
                    description: `<a:erro:777261754929381406> | ${message.author}, sem permissão para **conectar** ao canal de **voz**`,
                    color: 0x36393f,
                
                }
            }).then(msg => {
                msg.delete(5000)
            })
        };

		if(!permissions.has('SPEAK')) {
			message.channel.send({
                embed: {
                    description: `<a:erro:777261754929381406> | ${message.author}, sem permissão para **falar**`,
                    color: 0x36393f,
                
                }
            }).then(msg => {
                msg.delete(5000)
            })
        };

        if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

            var tumb = message.guild.iconURL
            if(!tumb) tumb = message.client.user.displayAvatarURL

            var Ma = await message.channel.send({
                embed: {
                    description: `<a:loadbotw:777260216931844106> | ${message.author}, estou conectando ao **__YouTube__**....`,
                    color: 0x36393f,
                    }
                })

                setTimeout(async () => {

                    var Mb = await Ma.edit({
                             embed: {
                                description: `<a:loadbotw:777260216931844106> | ${message.author}, pesquisando a **__PlayList__** desejada...`,
                                 color: 0x36393f,
                                 }
                             })
                            
                          return OKp(Mb)   
                     }, 1200)

async function OKp(Mb) {

        setTimeout(() => {

            youtube.getPlaylist(url).then(async playlist => {
                playlist.getVideos().then(async videos => {
                    videos.forEach(async video2 => {

            fetchVideoInfo(video2.id, async function (err ,video3) {

            await handleVideo(video3, message, voiceChannel, true);

                })
            })

            message.channel.startTyping()
            var embed = new Discord.MessageEmbed()

                    .setTitle('<:disc:815809341311156264> **Playlist** Adicionada a Fila:')
                        .setThumbnail(tumb)
                            .setFooter(`${message.author.username}`, message.client.user.displayAvatarURL)
                                .setTimestamp()
                                    .setColor('#36393e')
                                        .setDescription(`**•»** Nome: **${playlist.title}**\n**•»** Músicas: **${videos.length}**\n**•»** Author: ${message.author}`)
                                        
            Mb.edit(embed)
            message.channel.stopTyping()

                })
            }).catch(() => {
                
            Mb.edit({
                    embed: {
                        description: `<a:erro:777261754929381406> | ${message.author}, essa **Playlist** não **\`existe\`** ou é **\`privada\`**`,
                        color: 0x36393f,
                            }
                        })    
                    })
                }, 1500)
            }
            
		} else if(args.length === 1 && args[0].startsWith('https://www.youtube.com/watch?v=')) {

        try {
   
            await youtube.getVideo(url).then(vid => {
            
            fetchVideoInfo(vid.id, async function (err ,vide) {

            return handleVideo(vide, message, voiceChannel)
                })
            })

        } catch (e) {

            message.channel.send({
                embed: {
                    description: `<a:erro:777261754929381406> | ${message.author},  esse link não **\`corresponde\`** há nenhum vídeo do **\`YouTube\`**`,
                    color: 0x36393e,
                    }
                })
            }

        } else {

                    var Ma = await message.channel.send({
                        embed: {
                            description: `<a:loadbotw:777260216931844106> | ${message.author}, estou conectando ao **__YouTube__**....`,
                            color: 0x36393f,
                            }
                        })

                        setTimeout(async () => {

                            var Mb = await Ma.edit({
                                     embed: {
                                        description: `<a:loadbotw:777260216931844106> | ${message.author}, estou obtendo **__Resultados__**....`,
                                         color: 0x36393f,
                                         }
                                     })
                                    
                                  return OK(Mb)   
                             }, 1200)

async function OK(Mb) {
            
                    var videos = await youtube.searchVideos(searchString, 5)
                    if(!videos.length > 0 || videos.length < 5) {
                    
                    setTimeout(async () => { 

                            Mb.edit({
                                embed: {
                                    description: `<a:erro:777261754929381406> | ${message.author}, não conseguir obter **resultados**`,
                                    color: 0x36393e,
                                }
                            })
                        }, 1200)
                    } else {

                    var tumb = message.guild.iconURL
                    if(!tumb) tumb = message.client.user.displayAvatarURL

                    var index = 0
                    var razao = args.slice(0).join(' ')
                    //if(!razao) razao = "Sem Pesquisa"

                    setTimeout(async () => {

                    var embedM = new Discord.MessageEmbed()

                    .setTitle(`<:disc:815809341311156264> Resultados da Pesquisa: **${razao}**`)
                        .setTimestamp()
                            .setColor('#36393f')
                                .setFooter(`20 Segundos Para Seleção`, message.client.user.displayAvatarURL)
                                .setDescription(`ㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n${videos.map(video2 => `**[\`${++index}\`] -** ${video2.title}`).join('\n\n')}**\n\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n\nINSIRA UM VALOR DE 1 à 5\nDESEJA CANCELAR? DIGITE "cancelar"**`)
                                        .setThumbnail(tumb)

                    Mb.edit(embedM).then(async msg => {

                    message.channel.awaitMessages(message1 => message.content, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    }).then(async coletado => {

                    var mes = coletado.first().content === 'cancelar' || coletado.first().content > 0 && coletado.first().content < 6
                    
                    if(coletado.first().content === 'cancelar') {
                    
                        cancelou();

                    } else if(coletado.first().content > 0 && coletado.first().content < 6) {
                        
                        var num = parseInt(coletado.first().content);
                        var video = await youtube.getVideoByID(videos[num - 1].id); 

                        //console.log(video)
                        
                        fetchVideoInfo(video.id, async function (err ,vido) {

                        await handleVideo(vido, message, voiceChannel);
                        
                    })
                } else if(!mes) {
                        
                        message.channel.send({
                            embed: {
                                description: `<a:erro:777261754929381406> | ${message.author}, resposta **__inválida__**, tente **novamente**`,
                                color: 0x36393f,
                            
                            }
                        }).then(msg => {
    
                            msg.delete(5000)
                    })
                }

                    msg.delete()

                }).catch(err => {
                    
                    msg.delete()
                    message.channel.send({
                        embed: {
                            description: `<a:erro:777261754929381406> | ${message.author}, tempo **__expirado__**, tente **novamente**`,
                            color: 0x36393f,
                        
                            }
                        })
                    })
                })
            }, 1500)
        }
    }
};

async function cancelou() {

var a = await message.channel.send({
    embed: {
        description: `<a:loadbotw:777260216931844106> | ${message.author}, cancelando a **__Pesquisa__**....`,
        color: 0x36393f,
    
    }
})

setTimeout(() => {

a.edit({
    embed: {
        description: `<a:okay:512392301037748251> | ${message.author}, pesquisa cancelada com **sucesso**`,
        color: 0x36393e,
            }
        })
    }, 2000)
};

async function handleVideo(video, message, voiceChannel, playlist = false) {
    
var serverQueue = lista.queue.get(message.guild.id);

    var song = {

        id: video.videoId,
        title: video.title,
        url:  video.url,
        inserido: message.author.tag,
        duracao: null,
        thumb: video.thumbnailUrl,
        duracaoT: video.duration,
        numero: 1
    };

    if(!serverQueue) {

        var queueConstruct = {

            canalTexto: message.channel,
			canalVoz: voiceChannel,
			volume: 5,
            radio: false,
            soms: [],
            music: true,
            atual: 0,
            inicio: new Date(),
            restart: false,
            restarM: [],
            connection: null,
            voz: true,
            join: false,
            duraTotal: null
        };

        lista.queue.set(message.guild.id, queueConstruct);
        queueConstruct.soms.push(song);
        queueConstruct.duraTotal = song.duracaoT
       
    try {

        var connection = await message.member.voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.soms[0]);
        
    } catch (err) {
        
        console.log(`Eu não pude entrar no canal de voz. Guild - nome:(${message.guild.name}) id:(${message.guild.id}), erro: ${err}`); 

		message.channel.send({
                embed: {
                    description: `<a:erro:777261754929381406> | ${message.author}, eu não pude entrar no canal de **voz**`,
                    color: 0x36393f,
            }
        })

        lista.queue.delete(message.guild.id); 
    }

} else {

            let tempo = Math.floor(song.duracaoT)
            let horas;
            let minutos;
            let minutos2;
            let segundos;
    
            if (tempo >= 3600) {
    
                horas = Math.floor(tempo / 60 / 60)
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60 - horas * 60)
                segundos = Math.floor(tempo - (minutos * 60))
    
            } else {
    
                horas = 0
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60)
                segundos = Math.floor(tempo - (minutos * 60))
            }

        song.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`,
        song.numero = serverQueue.soms.length+1
        serverQueue.duraTotal = serverQueue.duraTotal+song.duracaoT

        serverQueue.soms.push(song)

        if(playlist) return undefined;

        var embed = new Discord.MessageEmbed()

            .addField('<:disc:815809341311156264> Adicionada á Fila', `**${song.title}**`, false)
                .addField(`<:relogio:767651996748087326> Duração:`, `**\`[${song.duracao}]\`**`, true)
                    .addField('🌀 Inserido Por:', `**\`${song.inserido}\`**`, true)
                        .setFooter(`${message.author.username}`, message.client.user.displayAvatarURL)
                            .setTimestamp()
                                .setColor('#36393f')
                                    .setThumbnail(song.thumb)

        message.channel.send(embed).then(msg => msg.delete(15000))
    }

    return undefined;
};

async function play(g, s) {

var serverQueue = lista.queue.get(g.id);

if(!s) {

    serverQueue.connection.disconnect();
    lista.queue.delete(g.id);

    return message.channel.send({
        embed: {
            description: `<a:NSFW:777975041052770404> A lista de reprodução acabou, use **\`${prefixo}play\`** para tocar **novamente**`,
            color: 0x36393f,
        }
    })
} else {

//console.log(s)

const dispatcher = serverQueue.connection.playStream(ytdl(s.url)).on('end', reason => {

console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)
    
if(reason === 'Sem músicas em Fila')

console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)

serverQueue.inicio = new Date();

if(serverQueue.restart === true) {

    play(g, serverQueue.soms[0])
} else {

serverQueue.soms.shift();
serverQueue.duraTotal = serverQueue.duraTotal-serverQueue.restarM[0].duracaoT
play(g, serverQueue.soms[0])

        serverQueue.soms.map(music => {
        music.numero = music.numero-1
        })
    }

}).on('error', error => {

    console.error(error)

});
 
dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

        let tempo = Math.floor(s.duracaoT)
        let horas;
        let minutos;
        let minutos2;
        let segundos;

        if (tempo >= 3600) {

            horas = Math.floor(tempo / 60 / 60)
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60 - horas * 60)
            segundos = Math.floor(tempo - (minutos * 60))

        } else {

            horas = 0
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60)
            segundos = Math.floor(tempo - (minutos * 60))
        }

            s.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`
            serverQueue.restarM = []
            serverQueue.restarM.push(s)

    var embedH = new Discord.MessageEmbed()

        .addField('<:disc:815809341311156264> Começando a Tocar', `**${s.title}**`, false)
            .addField('<:relogio:767651996748087326> Duração:', `**\`[${s.duracao}]\`**`, true)
                .addField('🌀 Inserido Por:', `**\`${s.inserido}\`**`, true)
                    .setFooter(`Senpai`, message.guild.iconURL)
                        .setColor('#36393f')
                            .setThumbnail(s.thumb)
        
    serverQueue.canalTexto.send(embedH).then(msg => msg.delete(15000))

        }
    }
}
