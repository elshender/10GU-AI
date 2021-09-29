const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'drinks',
    description: "Give some one a drink",
    execute(interaction, ){
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
           const exampleReply = rdmarr[Math.floor(Math.random() * rdmarr.length)];
            interaction.reply({
               content:`Some one gave you a ${ exampleReply.text}`,
               embeds: [{image: {url: exampleReply.img}}],
               ephemeral: true
               });
            console.log(interaction);
          },
         }
    
