const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');


module.exports = {
    name: 'skip',
    description: "An example command",
    execute(interaction, discordClient, player, stream){
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
        return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

        //Remove the current track from the queue
        stream.shift();

        try {
            //If no tracks remain in the queue diconnect the bot from the voice channel
            if(stream.length === 0){
                const connection = getVoiceConnection(guildId);
                connection.destroy();  
                return interaction.reply({ content: `${author.username} skipped the track`});  
            }

        } catch(err) {
            return interaction.reply({ content: "Could not skip, ensure something is playing", ephemeral: true });
        }
        
        //Play the track which is now at the front of the queue
        let resource = createAudioResource(stream[0].stream, {
            inputType : stream.type
        })

        player.play(resource);

        const author = interaction.member.user;

        return interaction.reply({ content: `${author.username} skipped the track`});

    }
}