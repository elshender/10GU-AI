const { token, guildId, clientId } = require('./config.json');
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const discordClient = new Client({intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});
const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const play = require('play-dl');
const ffmpeg = require('ffmpeg');
let player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
    }
});
let stream = [];
let commandList = new Map();
//Used to check whether the bot is playing or not
global.botPlayingFlag = false;
//List of files in the commands directory 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Sets the guild commands
for(file of commandFiles){
    const command = require(`./commands/${file}`);
    commandList.set(command.name, command);
  }

  discordClient.on("ready", () => {
    console.log("Ready!");
    const guild = discordClient.guilds.cache.get(guildId);
    let commands = guild.commands;

//Gets the commands and associates them with their names
 for(file of commandFiles){
   const command = require(`./commands/${file}`);
   commands.create(command);
 }
})

//Listens for and executes the commands
discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  const calledCommand = commandList.get(interaction.commandName);
  calledCommand.execute(interaction, discordClient, player, stream);
});

//detects when the player becomes idle
//if there are songs in the queue the next song is played
//if not the bot is disconnected from the voice channel
player.on(AudioPlayerStatus.Idle, async () => {
    stream.shift();
    //Prevents a crash where an idle state is detected after a bot has already disconnected from the voice channel
    if(!getVoiceConnection(guildId)){ console.log("Dodged idle error"); return; };
    
    if(stream.length === 0){
        botPlayingFlag = false;
        const connection = getVoiceConnection(guildId);
        connection.destroy();
        return;
    }
  
    let trackToPlay = await play.stream(stream[0])

    let resource = createAudioResource(trackToPlay.stream, {
        inputType : stream.type
    });

    player.play(resource);
   
})

discordClient.login(token);


	//if(!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')
    // on dc destroy queue