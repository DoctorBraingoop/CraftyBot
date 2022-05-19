// member joined guild
const bot = require('../app.js');
const channelID = "972328591704596520";
const { MessageEmbed } = require("discord.js");

bot.on("messageCreate", (msg) => {
  if (msg.content == "test") {
    const channel = bot.channels.cache.get(channelID);
    if (!channel) return;
    const embed = new MessageEmbed()
      .setTitle(`Member Joined`)
      .setDescription("Some description here");
    channel.send({embeds: [embed]});
  }
});

//guildMemberAdd
// member joined guild
// bot.on("guildMemberAdd", async (member) => {
//   const channel = client.channel.cache.get("964967586813059132");
//   if (!channel) return;
//   const embed = new Discord.MessageEmbed().setTitle(`Member Joined`);
//   channel.send(embed);
// });
