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
        
        if(!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined"){return interaction.editReply({ content: "Could not skip, ensure something is playing", ephemeral: true });}
       
        //Remove the current track from the queue and adds to previous track queue
        previousStream.unshift(stream.shift());
       
        //If no tracks remain in the queue diconnect the bot from the voice channel
        if(stream.length === 0){ 
            player.stop();
            global.botDisconnectTimer = setTimeout(() => {
                const connection = getVoiceConnection(guildId);
                connection.destroy();
                //Allows detection for if a timeout exists
                botDisconnectTimer = undefined; 
                }, 120000) 
            return interaction.editReply({ content: `${author.username} skipped the track`}) 
        }
        
        
        //Play the track which is now at the front of the queue
        let trackToPlay = await play.stream(stream[0])
        let resource = createAudioResource(trackToPlay.stream, {
            inputType : stream.type
        })

        player.play(resource);

        if(playerStatus === "paused"){player.unpause();}

        return interaction.editReply({ content: `${author.username} skipped the track`});

    }
}