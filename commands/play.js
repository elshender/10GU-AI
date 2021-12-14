const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');

module.exports = {
    name: 'play',
    description: "An example command",
    options: [
        {
            name: "track",
            type: "STRING",
            description: "The URL of the song you want to play",
            required: true
        }
    ],
    async execute(interaction, client, player, stream){
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
        return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

        //Add track to the stream
        const trackURL = interaction.options.get("track").value;

        //Prevents interaction error when code takes over 3 secs to execute before the interaction reply
        //Replys now "editReply", which is required for this
        await interaction.deferReply();
        
        try{
            stream.push(await play.stream(trackURL));
        }
        catch(err){
            return interaction.editReply({ content: "Please enter a valid YouTube URL", ephemeral: true });
        } 
    
        //Connect the bot to the voice channel
        const connection = joinVoiceChannel({
                    channelId : interaction.member.voice.channel.id,
                    guildId : guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                })
                
        //If only the track just added is present in the queue play the track
        if(stream.length < 2){
            let resource = createAudioResource(stream[0].stream, {
                inputType : stream.type
            })

            player.play(resource);

            connection.subscribe(player);

        }

        const author = interaction.member.user;
        const trackInfo = await play.video_basic_info(trackURL)

        return interaction.editReply({ content: `${author.username} added "${trackInfo.video_details.title}" to the queue` })
        

        // Embeded message and Style.
        // const plyrembed = {

        //     type: "rich",
        //     title: `**${track.title}**!` ,
        //     url: `${plyinfo.url}`,
        //     description: ``,
        //     color: `0x761f8d`,
        //     image: {url: `${plyinfo.thumbnail}`},
        //     author: {
        //     name: `DJ-10-GU`,
        //     icon_url: `https://i.imgur.com/XBilipH.gif`
        //     },
        //     footer: {
        //     text: `Duration : ${plyinfo.duration}`
        //     }
        // };

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
      //await interaction.followUp({ content: 'Loading...', ephemeral: true, embeds: [plyrembed] });
      // detect if connected to voice channel before destroying connection;


     }
}        
        
	
        
       




