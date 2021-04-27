const database = require('../configuração/database')
const Discord = require('discord.js')
const moment = require('moment')
module.exports = (xerphos, member) => {
  try {

    database.Guilds.findOne({ _id: member.guild.id }, function (erro, servidor) {

      if (servidor) {
        if (servidor.welcome) {

          if (member.guild.channels.cache.get(servidor.welcomechannel)) {

            try {

              member.guild.channels.cache.get(servidor.welcomechannel).send(servidor.welcomemsg.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.user.username}`).replace(/{users}/g, `${member.guild.members.size}`))

            } catch (e) {
              console.log(e)
            }
          }
        } else { }

        if (servidor.autorole) {
          if (member.guild.roles.cache.get(servidor.autoroleid)) {
              member.guild.members.cache.get(member.id).roles.add(servidor.autoroleid).catch(err => {
              servidor.autorole = false
              servidor.autoroleid = 'None'
              servidor.save()
            })
          } else {
            servidor.autorole = false
            servidor.autoroleid = 'None'
            servidor.save()
          }
        } else { }

      } else {

        var save = new database.Guilds({ _id: member.guild.id })
        save.save()

      }
    })
  } catch (err) {

    console.log(`Erro no meu evendo de GuildMemberAdd - Erro:\n${err}`)
    


    exports.name = 'guildMemberAdd';
    exports.run = async (client, member) => {
      const newProfile = {
        _id: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
      };
    
      try {
        await client.createProfile(newProfile);
      } catch (err) {
        console.error(err);
      }
    
      try {
        database.Guilds.findOne({
          _id: member.guild.id
        }, function (err, doc) {
          if (doc.config.autoRole.enabled) {
            if (doc.config.autoRole.roles) {
              member.guild.members.get(member.id).addRoles(doc.config.autoRole.roles);
            }
          }
    
    
          if (doc.config.messages.enabled) {
            if (doc.config.messages.welcome.enabled) {
              if (
                member.guild.channels.get(
                  doc.config.messages.welcome.channel
                )
              ) {
                try {
                  member.guild.channels
                    .get(doc.config.messages.welcome.channel)
                    .send(
                      doc.config.messages.welcome.message
                      .replace(
                        /{usuario.id}/g,
                        `<@${member.id}>`
                      )
                      .replace(
                        /{usuario.tagnome}/g,
                        `${member.user.tag}`
                      )
                      .replace(
                        /{usuario.tag}/g,
                        `${member.user.discriminator}`
                      )
                      .replace(
                        /{servidor}/g,
                        `${member.guild.name}`
                      )
                      .replace(
                        /{usuario.nome}/g,
                        `${member.user.username}`
                      )
                      .replace(
                        /{usuarios}/g,
                        `${member.guild.members.cache.size}`
                      )
                    );
                } catch (err) {
                  console.log(err);
                }
              }
            }
          }
    
           if (doc.counter) {
           if (doc.counter.channel) {
               if (!doc.counter.enabled) return;
    
              const n0 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303861231626");
              const n1 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985560260618");
              const n2 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "799518985565110273");
              const n3 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161302594420779");
              const n4 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263895085077");
              const n5 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263827976224");
              const n6 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825264880877680");
              const n7 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161303395401790");
              const n8 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "745161304083267595");
              const n9 = client.guilds.cache.get("745160420137893888").emojis.cache.find(o => o.id === "736825263953936416");
    
             let membros = `${client.guilds.cache.get(member.guild.id).memberCount.toString()}`;
             let counter = membros
                 .split("")
               .map(i => [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9][i])
                 .join("");
                 client.guilds.cache.get(message.guild.id).channels.cache.get(r => doc.counter.channel.includes(r.id)).setTopic(`${doc.counter.message}`.replace("{membros}", `${counter}`));
             } else {
             }
           }
        });
      } catch (err) {
        console.log('');







        
      }
      }
            }
          }
        
      
    
