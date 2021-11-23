const Discord = require('discord.js');
const moment = require("moment");
const db = require('quick.db');
require("moment-duration-format");
var ms = require("ms")

exports.run = function(client, message) {
    let color = "#36393F"
  
    const noperm = new Discord.MessageEmbed()
  .setColor(color)
  .setDescription("<:moderation:844550180967940137> Access Denied!")
  
  if (message.author.id != "444919402543054848")
  return message.channel.send(noperm);
  
 message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yuklen2:844551303488995338> | Data is requested....`).setColor('#36393F')).then(msg => {

   
const duration = moment.duration(client.uptime).format(" D [day], H [hour], m [minute], s [second]");
const ram = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`
let ping = new Date().getTime() - message.createdAt.getTime();

 const embed = new Discord.MessageEmbed()
 
 .setThumbnail(client.user.avatarURL())
 .setColor(color)
 .addField( `<:beyazdevam:844550131851460619>  Developer;\n`, `:white_small_square: | <@444919402543054848>`)
 .addField( '<:beyazdevam:844550131851460619>  Delay Times;',
              `:white_small_square: | Bot Delay: ` + client.ws.ping + 'ms\n:white_small_square: | Message Delay: ' + ping + 'ms')
 .addField( `<:beyazdevam:844550131851460619> Work Time:`, ":white_small_square: | "+duration)
 .addField( `<:beyazdevam:844550131851460619>  General Informations;\n`, ':white_small_square: | Members: ' + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)+ "\n"+':white_small_square: | Servers: ' + client.guilds.cache.size + "\n"+":white_small_square: | Commands: "+ client.commands.size+ "\n"+":white_small_square: | Memory Usage: "+ ram +"\n"+":white_small_square: | Processor Type: linux")
 .addField( '<:beyazdevam:844550131851460619>  Library;\n', `:white_small_square: | Discord.JS Version: ` + Discord.version +"\n"+":white_small_square: | Node.JS Version: "+ process.version)
 .setFooter(client.user.username,client.user.avatarURL())
 setTimeout(() =>{
   msg.edit(embed)
   setTimeout(() => {
     msg.delete()
     message.delete()
   },ms("25s"))
 },5000)//25 saniye yapalım siktir olup gidleim
})
                                                                                       }                                                        
exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['s'], 
  permLevel: 0 
};

exports.help = {
  name: 'statistic'
};
