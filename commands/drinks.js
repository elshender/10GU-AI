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
              img:  "https://imgur.com/0gpmXP4",
              About: ""
            },{
              text: "Soles Mezcal",
              img:  "https://imgur.com/kN3NW2D",
            },{
              text: "Smoltz Beer",
              img:  "https://imgur.com/mjjOUk3",
            },{
              text: "Radegast Gold Whiskey",
              img:  "https://imgur.com/k53glZB",
            },{
              text: "Torm's Surface Cleaner",
              img:  "https://imgur.com/NOrXxSm",
            },];

           // Gets random value of an object in an array.
           const rdmdrink = rdmarr[Math.floor(Math.random() * rdmarr.length)];

           // Gets the value entered into the command option by the user.
           const optionVal =interaction.options.get("user").value;
          

           // The '@' member name provides a user ID in a string that looks like this <@!5837383904505>.
           // This removes the special chars from that string so you just get the numbers.
           const userID = optionVal.replace(/[@!<>]/g, "")

           // Get message recipiet.
           const recipient = discordClient.users.cache.get(userID);

           // Get message recipiet.
           const author = interaction.member.user;

           console.log(author)

           // Sends message to the user ID.
           try {
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