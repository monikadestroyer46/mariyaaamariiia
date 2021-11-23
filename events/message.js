const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async message => {
  let prefix = '!!'
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const prefixler = await db.fetch(`prefixes.${message.guild.id}`);
  if(prefixler && prefixler.length >= 1) {
  prefixler.some(c => {
  if(message.content.startsWith(c)) prefix = c;
  });
  };

  if (message.content.startsWith(prefix)) {
  var command;
  var params;
  if(prefix.includes(' ')) {
  command = message.content.split(' ')[1];
  params = message.content.split(' ').slice(2);
  } else {
  command = message.content.split(' ')[0].slice(prefix.length);
  params = message.content.split(' ').slice(1);
  }
  
  let perms = client.elevation(message);
    
    let kurallar = db.fetch(`kurallar_${client.id}`);
   if (kurallar == null) kurallar = "0";
       let csdd = db.get(`rules.${message.author.id}`);
           if (!csdd) {
               let term = new Discord.MessageEmbed()
      .setFooter(`Copyright © Kaan Kodaz 2020 - 2021 - ${kurallar} users agreed to the rules!`)
      .setAuthor("AmonGuard - Discord Liability",client.user.avatarURL(),"https://nightcode.xyz")
      .setColor('BLUE')
      .addField(`Hello ${message.author.username},`,"We've updated our rules as per Discord policies!")
      .addField(`__Follow the Discord Community Guidelines!__`,"**1.** As a result of not following these rules, your account may be closed.\n**2.** Not adding the user token to any program/bot project and not throwing macros.\n**3.** Not creating a bot named `AmonGuard`.\n**4.** Follow the [Discord Community Guidelines](https://discord.com/guidelines).\n**5.** In case of any error on the bot, contact the founders through the [support server](https://discord.gg/zqB4ZwE2Bq).\n\n**-** If you have problems with Discord, please contact support:\nhttps://dis.gd/contact")
      .addField(`Don't forget!`,"By accepting the rules, you take responsibility for your account.")
      .setThumbnail(message.author.avatarURL({dynamic:true}))
    return message.channel.send(term).then(server => {
          server.react("✅");
      let cso = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
      let csv = server.createReactionCollector(cso, { time: 0 });
      csv.on("collect", async r => {
              db.add(`kurallar_${client.id}`, 1)  
        let thanks = new Discord.MessageEmbed()
        .setColor('PINK')
        .setThumbnail("https://cdn.discordapp.com/emojis/861416077471645736.png?v=1")
        .setDescription()
        .setAuthor()
        .setFooter()
        .setTimestamp()
          var gift = new Discord.MessageEmbed()
          .setAuthor(`Thanks ${message.author.username}!`)
          .setDescription(`We have a little gift for you for accepting our terms!\n\n> 160 Points\n> 50 Gold Money`)
  .setColor('#C71585')
  .setThumbnail("https://cdn.discordapp.com/emojis/861416077471645736.png?v=1")
  .setFooter(`Thank You ${message.author.username} For Accepting The Rules!`,message.author.avatarURL({dynamic:true}))
                    message.author.send(gift)
                      message.channel.send("Thanks for accepting the rules, a message has been sent to your DM box.").then(cs => cs.delete({ timeout: 10000 }));
                              message.delete({ timeout: 1000 });
                                      server.delete({ timeout: 100 });
                                              db.set(`rules.${message.author.id}`, "VERIFY");
                                                });              
    });
        }
    
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  }

};