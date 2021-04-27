const Guild = require("./configuração/database");

function traduzir(number) {
  number = number.toString();
  var texto = ``,
    numbers = {
      0: "<a:0_:745161303861231626>",
      1: "<a:1_:745161302992879616>",
      2: "<a:2_:745161302913318963>",
      3: "<a:3_:745161302594420779>",
      4: "<a:4_:745161303617830980>",
      5: "<a:5_:745161302695215137>",
      6: "<a:6_:745161303831871499>",
      7: "<a:7_:745161303395401790>",
      8: "<a:8_:745161304083267595>",
      9: "<a:9_:745161304020484166>",
    };
    msg2.react('745161303861231626');
                msg2.react('745161302992879616');
                msg2.react('745161302913318963');
                msg2.react('745161302594420779');
                msg2.react('745161303617830980');
                msg2.react('745161302695215137');
                msg2.react('722360472271192166');
                msg2.react('745161303831871499')
                msg2.react('745161303395401790')
                msg2.react('745161304083267595')
                msg2.react('745161304020484166')
                const collector = msg2.createReactionCollector((r, u) => (r.emoji.id === '745161302992879616' || r.emoji.id === '745161302913318963' || r.emoji.id === '745161302594420779' || r.emoji.id === '745161303617830980' ||  r.emoji.id === '745161302695215137' || r.emoji.id === '722360472271192166' || r.emoji.id === '745161303831871499' || r.emoji.id === '745161303395401790' || r.emoji.id === '745161304083267595' || r.emoji.id === '745161304020484166') && (u.id !== client.user.id && u.id === message.author.id))
                collector.on("collect", (r, u)=>{
                    r.users.remove(message.author.id)
                    switch (r.emoji.id) {
                    case '745161302992879616':
                    break;
                    case '745161302913318963': 
                    break;
                    case '745161302594420779': 
                    break;
                    case '745161303617830980': 
                    break;
                    case '745161302695215137':
                    break;
                    case '722360472271192166':
                    break;
                    case '745161303831871499':
                    break;
                    case '745161303395401790':
                    break;
                    case '745161304083267595':
                    break;
                    case '745161304020484166':
                    break;
                    
    
                    }})

  for (let i = 0; i < number.length; i++)
    texto += "" + numbers[parseInt(number[i])] + "";
  return texto;
}

module.exports = (client, member) => {
  let guild = member.guild;

  Guild.findOne({ _id: guild.id }, async function (err, server) {
    if (server.welcome.status) {
      client.channels.cache.get(server.welcome.channel).send(
        server.welcome.msg
          .replace(/{member}/g, `<@${member.id}>`)
          .replace(/{name}/g, `${member.user.username}`)
          .replace(/{total}/g, guild.memberCount)
          .replace(/{guildName}/g, guild.name)
      );
    }

    if (server.contador.status) {
      client.channels.cache
        .get(server.contador.channel)
        .setTopic(
          server.contador.msg.replace(
            /{contador}/g,
            traduzir(guild.memberCount)
          )
        );
    }
  });
};