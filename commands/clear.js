const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
require('dotenv').config();
const conf = require('../config.json');
const guildId = process.env.GUILDID || conf[`guildId`];
const play = require('play-dl');
const { disconnectBot } = require('../lib');

module.exports = {
    name: 'clear',
    description: "Clear the queue",
    async execute(interaction, discordClient, player) {

        await interaction.deferReply()

        const author = interaction.member.user;

        previousStream = [];

        //If bot is not connected to the voice channel or a bot disconnect timer has been intiated (hence nothing is playing) return
        if (!getVoiceConnection(guildId) || typeof botDisconnectTimer !== "undefined") { return interaction.editReply({ content: "Could not clear, ensure something is playing", ephemeral: true }); }

        player.stop();

        stream = [];

        disconnectBot();

        return interaction.editReply({ content: `${author.username} cleared the queue` })
    }
}


