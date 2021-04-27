const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let user;
  
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }
  
  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});
  // 4096 is the new biggest size of the avatar.
  // Enabling the dynamic, when the user avatar was animated/GIF, it will result as a GIF format.
  // If it's not animated, it will result as a normal image format.
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`<a:camerw:743759882750132294> ${user.username} `)
  .setImage(avatar)
  .setColor('#36393f')
  .setFooter(`Comando utilizado por: ${message.member.displayName}`, message.author.displayAvatarURL({dynamic : true}))
  
  
  message.delete()
  return message.channel.send(embed).then(m => m.delete({timeout: 30000}));
  
  
}

exports.help = {
  name: "avatar",
  description: "Display a user avatar",
  usage: "avatar [@user | user ID]",
  example: "avatar @ray#1337 \navatar"
}

exports.conf = {
  aliases: ["icon", "pfp", "ava"],
  cooldown: 5
}