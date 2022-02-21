const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
require('dotenv').config();
const conf = require('../config.json');
const guildId = process.env.GUILDID || conf[`guildId`];
const play = require('play-dl');
const { playRecur, disconnectBot } = require('../lib');


module.exports = {
    name: 'skip',
    description: "Skip the current track",
    async execute(interaction, discordClient, player) {
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId)
            return interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        await interaction.deferReply();

        const author = interaction.member.user;
        const playerStatus = await player._state.status

        //If bot is not connected to the voice channel or a bot disconnect timer has been intiated (hence nothing is playing) return
        if (!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined") { return interaction.editReply({ content: "Could not skip, ensure something is playing", ephemeral: true }); }

        //Remove the current track from the queue and adds to previous track queue
        previousStream.unshift(stream.shift());

        //If no tracks remain in the queue initiate a bot disconnect timer
        if (stream.length === 0) {
            player.stop();
            disconnectBot();
            return interaction.editReply({ content: `${author.username} skipped the track` })
        }

        //Play the track which is now at the front of the queue
        playRecur(player);

        if (playerStatus === "paused") { player.unpause(); }

        return interaction.editReply({ content: `${author.username} skipped the track` });

    }
}

//test unpause 