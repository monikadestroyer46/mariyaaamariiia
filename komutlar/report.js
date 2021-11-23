const {MessageEmbed} = require('discord.js'); 
const db = require('quick.db')
 const settings = require('../settings.json');
 let prefix = settings.prefix

exports.run = async(client, message, args, guild) => {
   
 let color = "#36393F"
 let thanks = "https://cdn.discordapp.com/emojis/861416077471645736.png?v=1"
  let user = message.mentions.users.first() || message.author 
  let ping = new Date().getTime() - message.createdAt.getTime();
  
  

let report = args.slice(0).join(' ');
if(!report) return message.channel.send(new MessageEmbed().setDescription(`Please report your complaint.`))
  message.channel.send(new MessageEmbed().setDescription(`Thanks for your feedback, we are sorry for the problem you are having. We will try to fix your problem as soon as possible. To follow the developments, come to the [support server](https://discord.gg/zqB4ZwE2Bq) of AmonGuard.`))

client.channels.cache.get("912464534608945162").send(new MessageEmbed()
.setTimestamp()
.setAuthor("The problem has been reported!")
.addField('Reporting By:', `[${message.author.tag}](https://discord.com/users/${message.author.id})`)
.addField('Problem:', `\`\`${report}\`\``)

)  

}
 module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
   
module.exports.help = {
  name: 'report'
};