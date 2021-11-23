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
 .setDescription("Invite AmonGuard to your home: [click](https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot) \nBecome a guest at Amon's home: [click](https://discord.gg/zqB4ZwE2Bq)")
  .setTimestamp()
 message.channel.send(guildmessage)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "invite"
};