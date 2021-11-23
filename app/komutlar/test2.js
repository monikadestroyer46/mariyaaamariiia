const { MessageEmbed } = require('discord.js');
const settings = require('../settings.json')
const prefix = settings.prefix
const moment = require('moment');
require('moment-duration-format');
exports.run = async(client, message, args) => {

      
let report = args.slice(0).join(' ');
if(!report) return message.channel.send(new MessageEmbed().setDescription(`Please report your complaint.`))
  message.channel.send(new MessageEmbed().setDescription(`Thanks for your feedback, we are sorry for the problem you are having. We will try to fix your problem as soon as possible. To follow the developments, come to the [support server](https://discord.gg/zqB4ZwE2Bq) of AmonGuard.`))

client.channels.cache.get("911695284973735966").send(new MessageEmbed()
.setTimestamp()
.setAuthor("The problem has been reported!")
.addField('Reporting By:', `[${message.author.tag}](https://discord.com/users/${message.author.id})`)
.addField('Problem:', `\`\`${report}\`\``)
)    
    

 };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu", "sunucu-bilgi", "sbilgi", "sb"],
  permLevel: 4,
}
exports.help = {
  name: 'test2',
  description: 'Etiketlediğiniz rol hakkında bilgi alırsınız.',
}