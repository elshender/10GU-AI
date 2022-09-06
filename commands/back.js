const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
require('dotenv').config();
const conf = require('../config.json');
const guildId = process.env.GUILDID || conf[`guildId`];
const play = require('play-dl');
const { playRecur, disconnectInterupt, decreasePosition, showStreamPosition } = require('../lib');

module.exports = {
    name: 'back',
    description: "Play the previous track",
    async execute(interaction, discordClient, player) {
        if (!interaction.member.voice.channelId) return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId)
            return interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        await interaction.deferReply();

        const author = interaction.member.user;
        const playerStatus = await player._state.status

        //If bot is not connected or there are no previous tracks return
        if (!getVoiceConnection(guildId) || showStreamPosition() === 0) { return interaction.editReply({ content: "There are no previous tracks queued", ephemeral: true }); }

        //If a the bot disconnect timer has been intialised interupt it 
        if (typeof botDisconnectTimer !== "undefined") {
            disconnectInterupt();
        }

        decreasePosition();

        playRecur(player);

        if (playerStatus === "paused") { player.unpause(); }

        return interaction.editReply({ content: `${author.username} skipped back a track` });

    }
}