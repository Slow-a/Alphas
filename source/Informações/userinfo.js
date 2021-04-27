const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

exports.run =  async (xerphos, message, args) => {

console.log(`comando userinfo ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

message.channel.startTyping()

moment.locale("pt-BR")
try{

let boti =  message.mentions.users.first() || message.author
let usuario = message.guild.member(message.mentions.users.first() || message.author)

    
let user;
if (message.mentions.users.first()) {
  user = message.mentions.users.first();
} else {
    user = message.author;
}

let administrador;
if(usuario.hasPermission("ADMINISTRATOR") === true) administrador = "Sim";
if(usuario.hasPermission("ADMINISTRATOR") === false) administrador = "Não";

let statusmebro;
if(usuario.presence.status === "dnd") statusmebro = "Não Pertubar";
if(usuario.presence.status === "idle") statusmebro = "Ausente";
if(usuario.presence.status === "stream") statusmebro = "Transmitindo";
if(usuario.presence.status === "offline") statusmebro = "Invisível";
if(usuario.presence.status === "online") statusmebro = "Disponível";

let botinfo;
if(boti.bot === true) botinfo = "Sim";
if(boti.bot === false) botinfo = "Não";    

let roles = usuario.roles.cache.map(r => `<@&${r.id}>`).slice(1).join(' **||** ');
if(roles.length === 0) roles = '**Sem Cargos**';


let member = message.guild.member(user);

const embed = new Discord.MessageEmbed()

    .setColor('#36393f')
    .setThumbnail(user.displayAvatarURL)
    .setTitle(` ${user.tag}`)
    .addField("<:st:832876660578582548> Apelido", `**${member.nickname !== null ? `${member.nickname}` : 'Sem Apelido'}**`, true)
    .addField("<:st:832876660578582548> ID", `**${user.id}**`, true)
    .addField("<:st:832876660578582548> Criada em", `**${moment(user.createdAt).format('LL')}**`, true)
    .addField("<:st:832876660578582548> Entrou em", `**${moment(member.joinedAt).format('LL')}**`, true)
    .addField("<:st:832876660578582548> Bot", `**${botinfo}**`, true)
    .addField("<:st:832876660578582548> Status", `**${statusmebro}**`, true)
    .addField("<:st:832876660578582548> Tag", `**#${user.discriminator}**`, true)
    .addField("<:st:832876660578582548> Administrador", `**${administrador}**`, true)
    .addField("<:st:832876660578582548> Cargos", `${roles}`)
    .setFooter(`${message.author.username}`, message.author.displayAvatarURL)
    .setTimestamp();

 message.channel.send(embed);
 
 message.channel.stopTyping()

} catch (er) {

var hata = new Discord.MessageEmbed()
        .setColor('#36393f')
        .setDescription("**<a:erro:777261754929381406> Ocorreu um erro ao executar este \`comando\`**");
        if(!role) return message.channel.send(hata)
        console.log(er)

    }
}
