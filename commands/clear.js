const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');

module.exports = {
    name: 'clear',
    description: "Clear the queue",
    async execute(interaction, discordClient, player){
        
        await interaction.deferReply()

        const author = interaction.member.user;
        
        if(!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined"){return interaction.editReply({ content: "Could not clear, ensure something is playing", ephemeral: true });}
        
        player.stop();

        stream = [];
        previousStream = [];

        global.botDisconnectTimer = setTimeout(() => {
            const connection = getVoiceConnection(guildId);
            connection.destroy();
            //Allows detection for if a timeout exists
            botDisconnectTimer = undefined; 
        }, 120000) 

        return interaction.editReply({ content: `${author.username} cleared the queue`}) 
    }
}
    

