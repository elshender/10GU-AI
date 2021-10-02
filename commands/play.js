module.exports = {
    name: 'play',
    description: "Add a song to the queue",
    options: [
        {
            name: "URL",
            type: "STRING",
            description: "The URL of the song you want to play",
            required: true
        }
    ],

    async execute(interaction, discordClient, player){
         if (!interaction.member.voice.channelId) return await interaction.reply({ content: ":yum: You are not in a voice channel!", ephemeral: true });
         if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: ":yum: You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.get("URL").value;
        const queue = player.createQueue(interaction.guild, {
          metadata: {
              channel: interaction.channel
          }
      });
      
      // verify voice chat connection
      try {
          if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
          queue.destroy();
          return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
      }

      await interaction.deferReply();
      const track = await player.search(query, {
          requestedBy: interaction.user
      }).then(x => x.tracks[0]);
      if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

      queue.play(track);

      return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
     
    }
    
    }
    