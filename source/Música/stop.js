const lista = require('../../configuração/queue.js')

exports.run =  async (xerphos, message, args) => {

console.log(`Comando stop ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {
    return message.channel.send({
      embed: {
          title: `<a:erro:777261754929381406> Somente membros com o cargo \`DJ\` podem parar a música`,
          color: 0x36393f,
      
      }
  })
}
  
if(!message.member.voiceChannel) {

        return message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> Você não está em um canal de **voz**`,
            color: 0x36393f,
                       
            }
        }).then(msg => {
        msg.delete(5000)
    })
}

if(!serverQueue) {
    message.channel.send({
        embed: {
            
            title: `<a:erro:777261754929381406> Não há nada **tocando**`,
            color: 0x36393f,
        
            }
        }).then(msg => {
        msg.delete(5000)
    })
} else if(serverQueue.radio) {

    message.channel.send({
        embed: {
            description: `<a:verm_INS_Verified:770003120163389481> | ${message.author}, **desligando** a rádio no canal **\`${serverQueue.canalVoz.name}\`**`,
            color: 0x36393f,
        }
    })

    serverQueue.connection.disconnect()
    lista.queue.delete(message.guild.id)

} else {

serverQueue.soms = [];
serverQueue.connection.dispatcher.end('Stop');
console.log(`Parei de tocar - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) - Author: ${message.author.tag}`)
    
    }
} catch (e) {

    console.log(`Erro comando de Stop - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}