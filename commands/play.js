const { joinVoiceChannel } = require('@discordjs/voice');
const { guildId } = require('../config.json');
const play = require('play-dl');
const YouTubeSr = require("youtube-sr").default;
const {playRecur, disconnectInterupt} = require("../lib")
let botReply;


module.exports = {
    name: 'play',
    description: "Add a track to the queue",
    options: [
        {
            name: "track",
            type: "STRING",
            description: "The URL of the song you want to play",
            required: true
        }
    ],
    async execute(interaction, client, player){
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
        return interaction.reply({ content: "You are not in my voice channel!",  ephemeral: true });

        //Prevents interaction error when code takes over 3 secs to execute before the interaction reply
        //Replys now "editReply", which is required for this
        await interaction.deferReply();
        
        const author = interaction.member.user;
        const playerStatus = await player._state.status;
        const trackURL = interaction.options.get("track").value;
   
        // First if matches a playlist and adds all playlist urls to the queue
        // Second if matches a single track and adds it to the queue
        // if neither of these match return
        if(play.yt_validate(trackURL) === "playlist"){
            try{
                let tracklist = await YouTubeSr.getPlaylist(trackURL);
                for (x in tracklist.videos){
                    let playlistTrackURl = `https://www.youtube.com/watch?v=${tracklist.videos[x].id}`
                    if (play.yt_validate(playlistTrackURl) !== 'video') {continue;}
                    stream.push(playlistTrackURl);
                    botReply = `${author.username} added "${tracklist.title}" playlist to the queue`; 
                }
            } catch {
                {return interaction.editReply({ content: "Playlist incompatible", ephemeral: true }); }
            }
        } else if (play.yt_validate(trackURL) === "video") {
                stream.push(trackURL);
                const trackInfo = await YouTubeSr.getVideo(trackURL);
                botReply = `${author.username} added "${trackInfo.title}" to the queue`;
        } else {
            return interaction.editReply({ content: "Please enter a valid YouTube URL", ephemeral: true });
        }

        
        if(typeof botDisconnectTimer !== "undefined"){;
            disconnectInterupt();
        }

        if(playerStatus === "paused"){player.unpause();}
    
        //Connect the bot to the voice channel
        const connection = joinVoiceChannel({
                    channelId : interaction.member.voice.channel.id,
                    guildId : guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                })
            
        //If the bot is not currently playing, play the track
        if(playerStatus === "idle"){
            
            playRecur(player);

            connection.subscribe(player);

        }

         return interaction.editReply({ content: botReply})
    }
}  

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
      
       
        
	
        
       




