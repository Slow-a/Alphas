const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports.run = async (client, message, args) => {
    if(!args[0]){
        message.channel.send(new Discord.MessageEmbed()
          .setDescription("<:settings:514924323618816021>**Comando:** s!unban")
          .setColor("#36393f")
          .setImage("https://cdn.discordapp.com/attachments/512727524791287812/514921214871863297/line.png")
          .setThumbnail("https://cdn.discordapp.com/attachments/512727524791287812/514912440765513758/network_1.png")
          .addField("<:st:514922245370413087>Uso:", "\`\`s!unban <id>\`\`")
          .addField("<:st:514922245370413087>Exemplo:", "\`\`s!unban 111111\`\`"))
          }
              let volte = args[0];
              if (!volte) return;
    
    const reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;
    const user = args[0];
    const modlog = client.channels.cache.find('name', 'reports');
    const moment = require('moment')
    moment.locale("pt-BR")
    if (!modlog) return message.channel.send(new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#36393f")
    .setDescription("<:cancel:504782695667335178> | Eu não consigo encontrar um canal reports")).then(m => m.delete(5000));
    if (reason.length < 1) return message.channel.send(new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#36393f")
    .setDescription("<:cancel:504782695667335178> | Você deve fornecer uma ID e uma razão para o desbanimento")).then(m => m.delete(5000));
    message.guild.unban(user);
    let reportEmbed = new Discord.MessageEmbed()
    .setDescription("Unban")
      .setColor("#36393f")
      .addField("Usuário Desbanido:", `<@${user}>  **ID:**  ${user}`)
      .addField("Desbanido por:", `${message.author}  **ID:**  ${message.author.id}`)
      .addField("Canal:", message.channel)
      .addField("Razão:", reason)
      let reportschannel = message.guild.channels.cache.find(`name`, "reports");
      if(!reportschannel) return message.channel.send(new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("#36393f")
      .setDescription("<:cancel:504782695667335178> | Não foi possível encontrar o canal de relatórios.")).then(m => m.delete(5000));
      reportschannel.send(message.author,reportEmbed);
      message.channel.send('\nO Membro desbanido com Sucesso!')
      return;
  
}
