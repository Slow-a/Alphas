exports.run =  async (xerphos, message, args) => {

console.log(`Comando join ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var voicechannel = message.member.voiceChannel;

if(!voicechannel) return message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> Conecte-se a um canal de voz`,
            color: 0x36393f,
        
        }
    })

return new Promise((resolve, reject) => {

var permissions = voicechannel.permissionsFor(message.client.user);

if(!permissions.has('CONNECT')) {
			return message.channel.send({
                embed: {
                    title: `<a:erro:777261754929381406> Sem permissão para conectar ao canal de **voz**`,
                    color: 0x36393f,
                
                }
            }).then(msg => {
                msg.delete(5000)
            })
        }

if(voicechannel && voicechannel.type == 'voice') {

    voicechannel.join().then(connection => {
        xerphos.speakers = [];
        
        resolve(connection);

        message.channel.send({
            embed: {
                title: `<a:verm_INS_Verified:770003120163389481> | Conectado ao canal de voz **\`${voicechannel.name}\`**!`,
                color: 0x36393f,
            
            }
        })

    }).catch(err => reject(err));

} else {

    message.channel.send({
        embed: {
            title: `<a:erro:777261754929381406> | Conecte-se a um canal de voz`,
            color: 0x36393e,
        
                }
            })
        }
    })
} catch (e) {

    console.log(`Erro comando de Join - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}
