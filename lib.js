const play = require('play-dl');
require('dotenv').config();
const { createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const conf = require('./config.json');
const guildId = process.env.GUILDID || conf[`guildId`];
//Position in playlist
let streamPosition = 0;
let stream = [];


module.exports = {

//increase or decrease position in playlist.
    increasePosition: () => { streamPosition++ },

    decreasePosition: () => { streamPosition-- },

    //functions for manipulating and getting information about the playlist

    resetPosition: () => streamPosition = 0,

    addToStream: track => stream.push(track),

    clearStream: () => stream = [],

    showStreamPosition: () => streamPosition,

    showStream: () => stream,

    //Constructer for playlist entries 
    PlaylistEntry: class {
        constructor(title, duration, thumbnail, id) {
            this.title = title ?? "Unknown Name",
                this.duration = duration ?? 0.00,
                this.thumbnail = thumbnail ?? undefined,
                this.id = id ?? undefined;
        }
    },


    //This needed to skip through tracks if they error and you have multiple in the queue - happens mostly with age restricted content
    //Skip a maximum of 5 times before intialising a disconnect
    playRecur: async function (player, count = 0) {
        count = count++;
        try {
            let trackToPlay = await play.stream(`https://www.youtube.com/watch?v=${stream[streamPosition].id}`);

            let resource = createAudioResource(trackToPlay.stream, {
                inputType: trackToPlay.type
            });
            player.play(resource);
            count = 0;
        } catch {
            if (streamPosition >= stream.length || count === 5) {
                module.exports.disconnectBot();
                return;
            }
            module.exports.increasePosition();
            module.exports.playRecur(player, count);
        }
    },

    //If no tracks remain in the queue initiate a bot disconnect timer
    disconnectBot: () => {
        global.botDisconnectTimer = setTimeout(() => {
            const connection = getVoiceConnection(guildId);
            connection.destroy();
            module.exports.clearStream()
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
