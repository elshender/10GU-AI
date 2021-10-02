const { token, guildId, clientId } = require('./config.json');
const fs = require('fs');
const {Client, Intents, Collection, Interaction, CommandInteractionOptionResolver} = require('discord.js');
const discordClient = new Client({intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Player } = require("discord-player");
const player = new Player(discordClient);

let commandList = new Map();

// List of file in the commands directory 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(file of commandFiles){
  const command = require(`./commands/${file}`);
  commandList.set(command.name, command);
}

discordClient.on("ready", () => {
  console.log("Ready!");

  // Sets the guild commands
const guild = discordClient.guilds.cache.get(guildId);
let commands = guild.commands;

  // Gets the commands and associates them with their names
let commandList = new Map();

 for(file of commandFiles){
   const command = require(`./commands/${file}`);
   commands.create(command);
 }

})

discordClient.login(token);

// Listens for and executes the commands
discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  //console.log(interaction);
  const calledCommand = commandList.get(interaction.commandName);
  calledCommand.execute(interaction, discordClient, player);
});

