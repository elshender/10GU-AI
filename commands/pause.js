const { getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');


module.exports = {
    name: 'pause',
    description: "Pause or unpause the current track",
    async execute(interaction, discordClient, player){
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
        return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

        await interaction.deferReply();

        const author = interaction.member.user;
        const playerStatus = await player._state.status
        
         //If bot is not connected to the voice channel or a bot disconnect timer has been intiated (hence nothing is playing) return
        if(!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined"){return interaction.editReply({ content: "Could not pause, ensure something is playing", ephemeral: true });}
        
        if(playerStatus === "paused"){
            player.unpause();
            return interaction.editReply({ content: `${author.username} unpaused the track`});
        }
        
        player.pause();
        
        return interaction.editReply({ content: `${author.username} paused the track`});

    }
}