const { MessageEmbed } = require('discord.js')
module.exports = {
    run: function (client, message, args) {
      var serverIcon = message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 });
        message.guild.fetchInvites()
            .then(invites => {
                if (!invites) return message.channel.send(`> ${message.author}, esse servidor não possui convites!`)
                const rank = invites.array().sort((a, b) => b.uses - a.uses).slice(0, 5)
                const embed = new MessageEmbed()
                    .setAuthor(`Convites | ${message.guild.name}`, client.user.avatarURL())
                    .setThumbnail(serverIcon)
                rank.map((user, index) => embed.addField('⠀⠀⠀⠀', `**${index + 1}º** ${user.inviter.username} \`\`\`Convidados: ${user.uses}\`\`\``, false))

                embed.addField('Total de Convites:', `${invites.size} convites`, true)
                    .setFooter(`Convide seus amigos! Digite -convite. `)
                    .setColor("#36393f")
                message.channel.send(embed)
            })
            .catch(() => { });
    },

    conf: {},
    get help() {
        return {
            name: 'invite',
            category: 'Info',
            description: 'Mostra os convites do servidor.',
            usage: 'invite'
        }
    }
}