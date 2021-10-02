module.exports = {
    name: 'example',
    description: "An example command",
    execute(interaction, client){
        
        const exampleReply = "This is an example reply!"
    interaction.reply({  content: exampleReply, ephemeral: true });
    },
    
    }
