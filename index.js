const Discord = require('discord.js');
const { token } = require('./config.json')

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('online');
});

client.login(token)