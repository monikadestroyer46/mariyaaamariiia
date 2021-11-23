const Discord = require('discord.js');

exports.run = async (bot, message, args) => {

     let color = "#36393F"
  
    const noperm = new Discord.MessageEmbed()
  .setColor(color)
  .setDescription("<:moderation:844550180967940137> Access Denied!")
  
  if (message.author.id != "444919402543054848")
  
  return message.channel.send(noperm); 
  message.channel.clone({position: message.channel.position}, {permissionOverwrites: message.channel.permissionOverwrites},{nsfw: message.channel.nsfw});
  message.channel.delete();
  message.channel.send("The channel was nuked!")

};

exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nuke'
};
