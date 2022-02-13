const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');


module.exports = {
    name: 'skip',
    description: "Skip the current track",
    async execute(interaction, discordClient, player){
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
        return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

        await interaction.deferReply();

        const author = interaction.member.user;
        const playerStatus = await player._state.status
        
        //If bot is not connected to the voice channel or a bot disconnect timer has been intiated (hence nothing is playing) return
        if(!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined"){return interaction.editReply({ content: "Could not skip, ensure something is playing", ephemeral: true });}
       
        //Remove the current track from the queue and adds to previous track queue
        previousStream.unshift(stream.shift());
       
        //If no tracks remain in the queue initiate a bot disconnect timer
        if(stream.length === 0){ 
            player.stop();
            global.botDisconnectTimer = setTimeout(() => {
                const connection = getVoiceConnection(guildId);
                previousStream = [];
                connection.destroy();
                //Clear variable so that it shows no disconnect timer is active
                botDisconnectTimer = undefined; 
                }, 120000) 
            return interaction.editReply({ content: `${author.username} skipped the track`}) 
        }
        
        
        //Play the track which is now at the front of the queue
        let trackToPlay = await play.stream(stream[0])
        let resource = createAudioResource(trackToPlay.stream, {
            inputType : trackToPlay.type
        })

        player.play(resource);

        if(playerStatus === "paused"){player.unpause();}

        return interaction.editReply({ content: `${author.username} skipped the track`});

    }
}