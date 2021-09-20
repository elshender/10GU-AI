const {Client, Intents} = require('discord.js');
const {botToken} = require('./config.json');
const discordClient = new Client({intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

discordClient.once('ready', () => {console.log("ready!")});

discordClient.login(botToken);
