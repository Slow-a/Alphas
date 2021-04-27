const lista = require('../../configuração/queue.js')

exports.run =  async (xerphos, message, args) => {

console.log(`Comando skip ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

    if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {

        message.channel.send({
          embed: {
              title: `<a:erro:777261754929381406> Somente membros com o cargo \`DJ\` podem skipar a música`,
              color: 0x36393f,
          
        }
    })
}

if(!message.member.voiceChannel) {
    
    message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> Você não está em um canal de voz`,
            color: 0x36393f,
        
            }  
        }).then(msg => {
            
        msg.delete(5000)
    })
}

if(!serverQueue) {
    message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> Nenhuma música na **fila**`,
            color: 0x36393f,
        
            }
        }).then(msg => {
        msg.delete(5000)
        })
} else if(serverQueue.radio) {

    message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> **Rádio** Detectada, **impossível** pular`,
            color: 0x36393f,
        
                }
            }).then(msg => {
        msg.delete(5000)
    })

} else {
    serverQueue.connection.dispatcher.end('Skip');
    console.log(`Música pulada - ${message.guild.id} - ${message.author.tag}`)
    }

} catch (e) {

    console.log(`Erro comando de Skip - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}