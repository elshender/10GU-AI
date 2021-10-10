module.exports = {
    name: 'play',
    description: "Add a song to the queue",
    options: [
        {
            name: "track",
            type: "STRING",
            description: "The URL of the song you want to play",
            required: true
        }
    ],

    async execute(interaction, discordClient, player){
         if (!interaction.member.voice.channelId) return await interaction.reply(
             {
                  content: "This Guy...", ephemeral: true ,
                  embeds: [
                    {
                      "type": "rich",
                      "title": `:warning:  :headphones: You are not in a voice channel ! :headphones:  :warning:`,
                      "description": `Join a voice channel and try the /play command again.`,
                      "color": 0xff3f3f
                    }
                  ]
             }
             );
         if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: ":yum: You are not in my voice channel!", ephemeral: true });

        const query = interaction.options.get("track").value;

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

      // Throw an embeded message if the track is not found.
      if (!track) return await interaction.followUp(
          { 
              content: `❌ | Track **${query}** not found!` 
          });

      queue.play(track);

      // Get the youtube Thumbnail. 
      const plyinfo = queue.nowPlaying();
      //console.log(thumbart.thumbnail)

      // Embeded message and Style.
      const plyrembed = {

        type: "rich",
        title: `**${track.title}**!` ,
        url: `${plyinfo.url}`,
        description: ``,
        color: `0x761f8d`,
        image: {url: `${plyinfo.thumbnail}`},
        author: {
          name: `DJ-10-GU`,
          icon_url: `https://i.imgur.com/XBilipH.gif`
        },
        footer: {
          text: `Duration : ${plyinfo.duration}`
        }
    };

      // Add Buttons to the bottom of the embed message from the player.
      // const plyrbuttons = {
      //   type: 1,
      //   components: [
      //     {
      //       style: 1,
      //       label: `Prev`,
      //       custom_id: `row_0_button_0`,
      //       disabled: false,
      //       type: 2
      //     },
      //     {
      //       style: 3,
      //       label: `Play`,
      //       custom_id: `row_0_button_1`,
      //       disabled: false,
      //       type: 2
      //     },
      //     {
      //       style: 5,
      //       label: `Pause `,
      //       custom_id: `row_0_button_2`,
      //       disabled: false,
      //       type: 2
      //     },
      //     {
      //       style: 4,
      //       label: `Stop`,
      //       custom_id: `row_0_button_3`,
      //       disabled: false,
      //       type: 2
      //     },
      //     {
      //       style: 1,
      //       label: `Next`,
      //       custom_id: `row_0_button_4`,
      //       disabled: false,
      //       type: 2
      //     }
      //   ]
      // };


      // Embeded message from player.
      await interaction.followUp({ content: 'Loading...', ephemeral: true, embeds: [plyrembed] });

    }
  }