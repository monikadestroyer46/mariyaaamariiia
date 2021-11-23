const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const settings = require('./settings.json');
require('discord-reply');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`!!guard ✨ ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members!`, { type:'LISTENING' })
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === settings.owner) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\

//Snipe başlangıç\\

client.on('messageDelete', message => {
  const db = require("quick.db")
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)

})
//Snipe son\\

// Etiketlenince yazılacak mesaj\\

client.on('message', message => {
if(!message.guild) return;
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  let serverprefix = prefix ? prefix : settings.prefix
 if (message.content === "<@776509767874773012>" || message.content === "<@!776509767874773012>") {
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`\nBot Prefix: \`\`${settings.prefix}\`\`\nCommands: \`\`${settings.prefix}guard\`\`\nBot/Server Invite: \`\`${settings.prefix}invite\`\``)
      .setColor("#36393F")
      .setThumbnail(client.user.avatarURL())
   message.channel.send(embed);
 }
 })

let notification = "https://cdn.discordapp.com/emojis/845261624549310484.png?v=1"

// Message sent to the ^owner^ of the added server

 let thanks = "https://cdn.discordapp.com/emojis/861416077471645736.png?v=1"

client.on('guildCreate', guild => {
guild.owner.send(new Discord.MessageEmbed()
.setAuthor(`AmonGuard has joined your server!`,notification)
.setColor("#36393F")
.setDescription(`
Commands: \`!!guard\`
Support server: \`!!invite\`
Report problems from server: \`!!report <message>\`

||NOTE: This message is set to be sent to the server owner.||`))
  
  

})


// Premium System

client.on('ready', () => {
  client.guilds.cache.forEach(guild => {
  guild.members.cache.forEach(async member => {
  const VeriÇekici = await db.fetch(member.user.id);
  if(!VeriÇekici) return;
  if((Date.now() <= VeriÇekici.Bitiş) || VeriÇekici) {
  let kalan = VeriÇekici.Bitiş - Date.now();
  setTimeout(() => {
  db.delete(member.user.id)
  }, kalan);
  };
  });
  });
  });





 