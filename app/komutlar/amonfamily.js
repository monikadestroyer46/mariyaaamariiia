const Discord = require("discord.js");
const ms = require("ms");
const settings = require('../settings.json');

exports.run = (client, message, args) => {
  
    
 let color = "#36393F"
 let thanks = "https://cdn.discordapp.com/emojis/861416077471645736.png?v=1"
  let user = message.mentions.users.first() || message.author 
  let ping = new Date().getTime() - message.createdAt.getTime();

 const guildmessage = new Discord.MessageEmbed()
 .setColor(color)
 .setTitle("The Amon Family")
 .setThumbnail(client.user.avatarURL({ dynamic:true }))
 .setURL("https://discord.gg/zqB4ZwE2Bq")
 .addField("AmonGuard",`It provides the best protection for your server!`)
 .addField("AmonModeration",`Soon!`)
 .addField("AmonRegister",`Soon!`)
 .setFooter(`Asked by ${message.author.username}!`,message.author.avatarURL({ dynamic:true }))
 .setTimestamp()
 message.channel.send(guildmessage)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["amonfamily"],
  permLevel: 0
};

exports.help = {
  name: "amon-family"
};