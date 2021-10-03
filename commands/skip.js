module.exports = {
        name: 'skip',
        description: "An example command",
        execute(interaction, client, player){
            if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
            if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
            return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

            const queue = player.getQueue(interaction.guildId);

            
            try {
                queue.skip()
            } catch {
                return interaction.reply({ content: "Could not skip, ensure something is playing", ephemeral: true });
            }       

        }
    }