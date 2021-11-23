const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async(client, message, args) => {

        let color = "#36393F"
    let wrong = "https://cdn.discordapp.com/emojis/844550247778091018.png"
    let bomb = "https://cdn.discordapp.com/emojis/860368079460892703.png?v=1"
    let notification = "https://cdn.discordapp.com/emojis/845261624549310484.png?v=1"
  
  let modlog = db.fetch(`log_${message.guild.id}`)
  var guild = message.guild;
  let bancontrole = await message.guild.fetchBans();
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
                                                .setColor(color)
                                                .setAuthor("Wrong!", wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                                .setDescription("You must have **Ban Members** permission to use this command!")
                                                .setFooter(`Asked By ${message.author.username}!`, message.author.avatarURL())).then(m=>m.delete({timeout:10000}));
  if (!modlog) return message.channel.send(new Discord.MessageEmbed()
                                          .setColor(color)
                                          .setAuthor("Wrong!",wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                          .setDescription('In order to use this command, the mod-log channel must be set!')
                                          .setFooter(`Asked By ${message.author.username}!`,message.author.avatarURL({dynamic:true}))
                                          .setTimestamp()).then(m => m.delete({timeout:10000}))
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed()
                                                .setColor(color)
                                                .setAuthor("Wrong!", wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                                .setDescription("I need to have the **Ban Members** privilege to use this command, but I don't.")
                                                .setFooter(`Asked By ${message.author.username}!`, message.author.avatarURL())).then(m=>m.delete({timeout:10000}));
 
  var user = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!user) return message.channel.send(new Discord.MessageEmbed()
                                       .setColor(color)
                                       .setAuthor("Wrong!",wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                       .setDescription("You must specify the person to be banned from the server!")
                                       .setFooter(`Asked By ${message.author.username}!`,message.author.avatarURL({dynamic:true}))).then(m=>m.delete({timeout:10000}));
 var reason = args.slice(1).join(" ");


    if(message.author == user) return message.channel.send(new Discord.MessageEmbed()
                                                          .setColor(color)
                                                          .setAuthor("Wrong!",wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                                          .setDescription("I can't let you ban yourself, but you can leave the server if you want.")
                                                          .setFooter(`Asked By ${message.author.username}!`,message.author.avatarURL({dynamic:true}))).then(m=>m.delete({timeout:10000}));
    if (bancontrole.get(user.id)) return message.channel.send(new Discord.MessageEmbed()
                                                             .setColor(color)
                                                             .setAuthor("Wrong!",wrong,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                                                             .setDescription("The person you want to ban is already banned.")
                                                             .setFooter(`Asked By ${message.author.username}!`,message.author.avatarURL({dynamic:true}))).then(m=>m.delete({timeout:10000}));

 var now = new Date()
 if (!reason) {
         try {
          user.send(new Discord.MessageEmbed()
                   .setColor(color)
                   .setDescription(`You have been banned from ${guild} by ${message.author.tag}!`))
          message.channel.send(`${user} has been banned!`)
             let modloginformation = db.fetch(`log_${message.guild.id}`)
    client.channels.cache.get(modloginformation).send(new Discord.MessageEmbed()
                         .setAuthor(`Notification!`,notification,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                         .setDescription(`${user} has been banned by an authorized named ${message.author}.`)
                         .setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
                         .setTimestamp()
                         .setColor(color))
          guild.members.ban(user, { reason: reason});
        } catch (error) {
          message.channel.send(`Ups... There was a problem, please contact our support server.`)
          console.log(error)
        }
 } else {
 try {
   user.send(new Discord.MessageEmbed()
             .setColor(color)
             .setDescription(`You have been banned from ${guild} by ${message.author.tag}! \nReason: **${reason}**`))
   message.channel.send(`${user} has been banned! \nReason: ${reason}`)
     let modloginformation = db.fetch(`log_${message.guild.id}`)
  client.channels.cache.get(modloginformation).send(new Discord.MessageEmbed()
                         .setAuthor(`Notification!`,notification,"https://discord.com/oauth2/authorize?client_id=776509767874773012&permissions=268823671&scope=bot")
                         .setDescription(`${user} has been banned by ${message.author}.\nReason: ${reason} `)
                         .setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
                         .setTimestamp()
                         .setColor(color))
   guild.members.ban(user, { reason: reason});
 } catch (error) {
   message.channel.send(`Ups... There was a problem, please contact our support server.`)
   console.log(error)
 }
 }

};


exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban'
};