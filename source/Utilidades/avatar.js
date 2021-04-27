const Discord = require("discord.js")

exports.run =  async (xerphos, message, args) => {

console.log(`Comando avatar ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

    let member = message.mentions.users.first() || xerphos.users.get(args[0]) || message.author;
    let avatar = member.displayAvatarURL;
   
    if (avatar.endsWith(".gif")) {
        avatar = `${member.displayAvatarURL}?size=2048`
    }

    const embed = new Discord.MessageEmbed()
      
      .setTitle(`${member.tag}`)
       .setFooter(`Senpai`, xerphos.user.displayAvatarURL)
      .setColor("#36393f", true)
      .setDescription(`<a:camerw:777975057363370006> [Avatar para baixar](${avatar})`)
      .setImage(avatar)
      
    message.channel.send(embed)

}