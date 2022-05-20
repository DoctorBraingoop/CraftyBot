const { bot } = require("../app.js");
const channelID = "972328591704596520";
// const { MessageEmbed } = require("discord.js");

let embedEnabled = true;

const embed = {
  color: embedEnabled ? 0x00ff99 : 0xff3333,
  description: embedEnabled
    ? ":white_check_mark: Greeting Messages enabled."
    : ":x: Greeting Messages disabled.",
};

module.exports = {
  name: "welcome",
  description: "Welcome embed",
  execute(msg, args) {
    msg.channel.send({ embeds: [embed] });
  },
};

// const test = (msg) => {
//   const channel = bot.channels.cache.get(channelID);
//   if (!channel) return;
//   const embed = new MessageEmbed()
//     .setTitle(`Member Joined`)
//     .setDescription("Some description here");
//   msg.channel.send({ embeds: [embed] });
// };
