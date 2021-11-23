const Discord = require('discord.js'); 
const db = require('quick.db')
 const settings = require('../settings.json');
 let prefix = settings.prefix

exports.run = async(client, message, args, guild) => {
   
 let color = "#36393F"
 let thanks = "https://cdn.discordapp.com/emojis/861416077471645736.png?v=1"
  let user = message.mentions.users.first() || message.author 
  let ping = new Date().getTime() - message.createdAt.getTime();

 const Embed = new Discord.MessageEmbed()
 .setAuthor(`Amon GUARD`, client.user.avatarURL(),"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
 .setColor(color)
 .addField("<:guard:844550197572534302> __Guard Commands:__",`**-** !!rguard: Reestablishes deleted roles with the same effects.\n**-** !!cguard: Establishes the deleted channel with the same permissions and position.\n**-** !!eguard: Reloads deleted emojis.\n**-** !!uguard: Removes the punishment of users who are banned/kicked with a right click on the server, an invitation is sent to them again.`)
 .addField("<:other:911831245774782504> __Other Commands:__",`**-** !!ban: Bans a member.\n**-** !!kick: Kicks a member.\n**-** !!glog: Sets the guard log.\n**-** !!report: Report problems about AmonGuard!\n**-** !!invite: Invite AmonGuard to your server!\n**-** !!amon-family: Meet the Amon family!`)
 .setDescription(`\n<a:loading:844551325483270155> **Ping**: `+ping+"ms!\n**Version**: *Trial Version*")
 .setFooter(`Asked By ${message.author.username}!`, message.author.avatarURL())
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({dynamic: true}))
 message.channel.send(Embed)

}
 module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["guard"],
  permLevel: 0
};
   
module.exports.help = {
  name: 'guard'
};