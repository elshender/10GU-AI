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
              text: "drink1",
              img:  "https://starcitizen.tools/images/6/65/Pips-cans-3.9.1.jpg"
            },{
              text: "drink2",
              img:  "https://storage.googleapis.com/cdn.vinoshipper.com/wine/c7e5b53f-78af-440f-95a1-6cc4d4fcb58b.jpg",
            },{
              text: "drink3",
              img:  "images/spiderman.jpg",
            },{
              text: "drink4",
              img:  "https://i.dailymail.co.uk/1s/2021/04/27/09/42269380-0-image-a-3_1619513568073.jpg",
            },{
              text: "drink5",
              img:  "https://i.ytimg.com/vi/g8sKB6iEyMI/maxresdefault.jpg",
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