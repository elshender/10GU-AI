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
            },{
              text: "Earth Gin",
              img:  "https://i.imgur.com/8QPnJKD.png",
            },{
              text: "Uknown Banu Gin",
              img:  "https://i.imgur.com/GXXvoqd.png",
            },{
              text: "Starlighters Cognac",
              img:  "https://i.imgur.com/3zyAUp8.png",
            },{
              text: "Radegast Whiskey",
              img:  "https://i.imgur.com/qs1IrW0.png",
            },{
              text: "Leviahan Whiskey",
              img:  "https://i.imgur.com/d9mXAmU.png",
            },{
              text: "Onesin Water",
              img:  "https://i.imgur.com/JKpLFML.png",
            },{
              text: "Tevarin Whiskey",
              img:  "https://i.imgur.com/4D9hHfs.png",
            },{
              text: "Hippocampus",
              img:  "https://i.imgur.com/pWE3cAn.png",
            },{
              text: "Chibanzaa Root Tea",
              img:  "https://i.imgur.com/UkIO7ya.png",
            },{
              text: "Cathcart Rum",
              img:  "https://i.imgur.com/WldXVNd.png",
            },{
              text: "Sky Whiskey",
              img:  "https://i.imgur.com/hueZBIC.png",
            },];

           // Gets random value of an object in an array.
           const rdmdrink = rdmarr[Math.floor(Math.random() * rdmarr.length)];

           const author = interaction.member.user;

           // Sends message to the user ID.
           try {
            const optionVal = interaction.options.get("user").value;
            const userID = optionVal.replace(/[@!<>]/g, "")
            const recipient = discordClient.users.cache.get(userID);
            interaction.guild.members.cache.get(userID).send(
                { 
                  content: `${recipient}`,
                  embeds: [
                  {
                  title: "Here is a gift, enjoy !",
                  description: `${author.username} sent you a bottle of ${ rdmdrink.text}. with compliments - The Kuro Casillero.`,
                  color: 16312092,
                  footer: {
                    icon_url: "https://i.imgur.com/BaLPmjP.png",
                    text: "The Kuro Casillero"
                  },
                  thumbnail: {
                    url: "https://i.imgur.com/BaLPmjP.png"
                  },
                  image: {
                    url: rdmdrink.img
                  },
                  author: {
                    name: "The Kuro Casillero",
                    url: "https://discordapp.com",
                    icon_url: "https://i.imgur.com/BaLPmjP.png"
                  }
                }
              ],
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