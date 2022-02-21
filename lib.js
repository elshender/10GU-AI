const play = require('play-dl');
require('dotenv').config();
const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const conf = require('./config.json');
const guildId = process.env.GUILDID || conf[`guildId`]
module.exports = {

    //This needed to skip through tracks if they error and you have multiple in the queue - happens mostly with age restricted content
    //Skip a maximum of 5 times before intialising a disconnect
    playRecur: async (player, count = 0) => {
        count = count++;
        try {
            let trackToPlay = await play.stream(stream[0]);
            let resource = createAudioResource(trackToPlay.stream, {
                inputType: trackToPlay.type
            });
            player.play(resource);
        } catch {
            if (stream.length === 0 || count === 5) {
                module.exports.disconnectBot();
                return;
            }
            stream.shift()
            module.exports.playRecur(player, count)
        }
    },

    //If no tracks remain in the queue initiate a bot disconnect timer
    disconnectBot: () => {
        global.botDisconnectTimer = setTimeout(() => {
            const connection = getVoiceConnection(guildId);
            connection.destroy();
            stream = [];
            previousStream = [];
            //Clear variable so that it shows no disconnect timer is active
            botDisconnectTimer = undefined;
        }, 120000)
    },

    //If a the bot disconnect timer has been intialised interupt it 
    disconnectInterupt: () => {
        {
            clearTimeout(botDisconnectTimer);
            botDisconnectTimer = undefined;
        }
    },

    //Generate RSI code for org member validation
    codeGen: (memberId) => {
        const date = new Date();
        const memberIdNum = Number(memberId.slice(4, 14));
        let confirmCode = 73576987 + date.getUTCFullYear() + date.getUTCDate() + memberIdNum;
        return confirmCode.toString(16);  
    }
}

