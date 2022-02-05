const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');

module.exports = {
    name: 'clear',
    description: "Clear the queue",
    async execute(interaction, discordClient, player){
        
        await interaction.deferReply()

        const author = interaction.member.user;

        previousStream = [];

        //If bot is not connected to the voice channel or a bot disconnect timer has been intiated (hence nothing is playing) return
        if(!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined"){return interaction.editReply({ content: "Could not clear, ensure something is playing", ephemeral: true });}
        
        player.stop();

        stream = [];

        global.botDisconnectTimer = setTimeout(() => {
            const connection = getVoiceConnection(guildId);
            connection.destroy();
            //Clear variable so that it shows no disconnect timer is active
            botDisconnectTimer = undefined; 
        }, 120000) 

        return interaction.editReply({ content: `${author.username} cleared the queue`}) 
    }
}
    

