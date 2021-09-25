const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'example',
    description: "An example command",
    execute(interaction){
        const exampleReply = "This is an example reply!"
    interaction.reply({  content: exampleReply, ephemeral: true });
    },
    
    }
