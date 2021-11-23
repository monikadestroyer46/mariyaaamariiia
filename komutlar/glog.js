const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args,) => {
  
  
let logk = message.mentions.channels.first();
let logs = await db.fetch(`log_${message.guild.id}`)
  
   let color = "#36393F"
    
   let wrong = "https://cdn.discordapp.com/emojis/844550247778091018.png"
    let notification = "https://cdn.discordapp.com/emojis/845261624549310484.png?v=1"
  
   let wrong1 = new Discord.MessageEmbed()
.setColor(color)
.setAuthor("Wrong!", wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
.setDescription("You must have **Administrator** permission to use this command!")
.setFooter(`Asked By ${message.author.username}!`, message.author.avatarURL())
  .setTimestamp();
  
   let wrong2 = new Discord.MessageEmbed()
   .setColor(color)
   .setDescription("Moderator-Log is not already set!")
   .setTimestamp();
  
  let wrong3 = new Discord.MessageEmbed()
  .setColor(color)
  .setAuthor("Wrong!",wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
  .setDescription(`Usage: \`s!modlog #channel\`\nReset: \`s!modlog reset\``)
  .setTimestamp();
  
  let succesful2 = new Discord.MessageEmbed()
  .setColor(color)
  .setDescription(`Moderator-Log channel reset successfully!`)
  .setTimestamp();
  
  let succesful = new Discord.MessageEmbed()
  .setColor(color)
  .setDescription(`Moderator-Log has been successfully set to ${logk}!`)
  
  let channelmessage = new Discord.MessageEmbed()
  .setColor(color)
  .setDescription(`This channel has been successfully set as the Moderator-Log channel. Logs of moderation and protection systems will be kept in this channel!`)
   
  let channelmessage2 = new Discord.MessageEmbed()
 .setAuthor("Notification!",notification,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
  .setDescription(`Moderator Log reset by ${message.author}!`)
  .setTimestamp()
  .setColor(color)
  .setFooter(client.user.username,client.user.avatarURL())
  
  let channelmessage3 = new Discord.MessageEmbed()
  .setAuthor("Notification!",notification,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
  .setDescription(`Moderator-Log set by ${message.author}!`)
  .setTimestamp()
  .setColor(color)
  .setFooter(client.user.username,client.user.avatarURL())
  
  
  let modlog = db.fetch(`log_${message.guild.id}`)
  
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(wrong1);
  
  if (args[0] === "reset") {
    if(!logs) return message.channel.send(wrong2);
    await client.channels.cache.get(modlog).send(channelmessage2)
    db.delete(`log_${message.guild.id}`)
   message.channel.send(succesful2);
  
    return
  }
  
if (!logk) return message.channel.send(wrong3);

db.set(`log_${message.guild.id}`, logk.id)

message.channel.send(succesful);
  
  
  let modlog1 = db.fetch(`log_${message.guild.id}`)
  
  await client.channels.cache.get(modlog1).send(channelmessage)
  
  client.channels.cache.get(modlog1).send(channelmessage3)

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["glog"],
    permLevel: 0
};

exports.help = {
    name: 'guard-log'
};