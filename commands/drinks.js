const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'drinks',
    description: "Give some one a drink",
    options: [
      {
          name: "user",
          type: "STRING",
          description: "@username you want to send a drink to.",
          required: true
      }
  ],
    execute(interaction,discordClient ){

        // rdmarr is an array of objects containing images and text.
        const rdmarr = [{
              text: "Jynx Gin",
              img:  "https://i.imgur.com/0gpmXP4.png",
              About: ""
            },{
              text: "Soles Mezcal",
              img:  "https://i.imgur.com/kN3NW2D.png",
            },{
              text: "Smoltz Beer",
              img:  "https://i.imgur.com/mjjOUk3.png",
            },{
              text: "Radegast Gold Whiskey",
              img:  "https://i.imgur.com/k53glZB.png",
            },{
              text: "Torm's Surface Cleaner",
              img:  "https://i.imgur.com/NOrXxSm.png",
            },];

           // Gets random value of an object in an array.
           const rdmdrink = rdmarr[Math.floor(Math.random() * rdmarr.length)];

           const author = interaction.member.user;

           console.log(author)

           // Sends message to the user ID.
           try {
            const optionVal = interaction.options.get("user").value;
            const userID = optionVal.replace(/[@!<>]/g, "")
            const recipient = discordClient.users.cache.get(userID);


            interaction.guild.members.cache.get(userID).send({
              content:`${recipient}, ${author.username} sent you a bottle of ${ rdmdrink.text}.`,
              embeds: [{image: {url: rdmdrink.img}}],
              ephemeral: true
            })
          }
            catch(error){
            // Reply message to the message author.
              interaction.reply({
              content:`:no_entry_sign:  Error, Not a member. :no_entry_sign:`,
              ephemeral: true
           });
             console.log(error)
           }

           // Reply message to the message author.
           interaction.reply({
              content:` A bottle of ${ rdmdrink.text} was selected.`,
              ephemeral: true
              }); 
            },
          }