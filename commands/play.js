const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();
const conf = require('../config.json');
const guildId = process.env.GUILDID || conf[`guildId`];
const play = require('play-dl');
const YouTubeSr = require("youtube-sr").default;
const { playRecur, disconnectInterupt } = require("../lib")



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
    async execute(interaction, client, player) {
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId)
            return interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        //Prevents interaction error when code takes over 3 secs to execute before the interaction reply
        //Replys now "editReply", which is required for this
        await interaction.deferReply();

        const author = interaction.member.user;
        const playerStatus = await player._state.status;
        const trackURL = interaction.options.get("track").value;
        const validateURL = play.yt_validate(trackURL);

        // First if detects a correct playlist or video URL
        // Second if detects a playlist and adds all playlist urls to the queue
        // Third if detects a single track and adds it to the queue
        if (!(validateURL === "playlist" || validateURL === "video")) { return interaction.editReply({ content: "Please enter a valid YouTube URL" }); }

        if (validateURL === "playlist") {
            let trackList;
            try {
                trackList = await YouTubeSr.getPlaylist(trackURL);
                if (!trackList) throw "incompatible";
            }
            catch {
                { return interaction.editReply({ content: "Playlist incompatible" }); }
            }
            for (x in trackList.videos) {
                let playlistTrackURl = `https://www.youtube.com/watch?v=${trackList.videos[x].id}`
                if (play.yt_validate(playlistTrackURl) !== 'video') { continue; }
                stream.push(playlistTrackURl);
                interaction.editReply({ content: `${author.username} added "${trackList.title}" playlist to the queue` });
            }
        }

        if (validateURL === "video") {
            stream.push(trackURL);
            try {
                const trackInfo = await YouTubeSr.getVideo(trackURL);
                interaction.editReply({ content: `${author.username} added "${trackInfo.title}" to the queue` });
            }
            catch {
                interaction.editReply({ content: `${author.username} added "Undefined Name" to the queue` });
            }
        }

        if (typeof botDisconnectTimer !== "undefined") { disconnectInterupt(); }

        if (playerStatus === "paused") { player.unpause(); }

        //Connect the bot to the voice channel
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })

        //If the bot is not currently playing, play the track
        if (playerStatus === "idle") {
            playRecur(player);
            connection.subscribe(player);

        }
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










