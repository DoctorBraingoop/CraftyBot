const { bot } = require("../app.js");
const { MessageEmbed } = require("discord.js");
const channelID = "964967586813059132";
let embedEnabled = false;

function welcome() {
  embedEnabled = !embedEnabled;
  const color = embedEnabled ? 0x00ff99 : 0xff3333;
  const description = embedEnabled
    ? ":white_check_mark: Greeting Messages enabled."
    : ":x: Greeting Messages disabled.";

  const embed = new MessageEmbed().setColor(color).setDescription(description);
  return embed;
}
module.exports = {
  name: "welcome",
  description: "Welcome embed",
  execute(msg, args) {
    args = args.join(" ");
    if (args == "") msg.channel.send({ embeds: [welcome()] });


    if (embedEnabled) {
      // bot.on("guildMemberAdd", async (member) => {
      //   const channel = bot.channels.cache.get(channelID);
      //   if (!channel) return;
      //   const embed = new MessageEmbed().setTitle(`Member Joined`);
      //   channel.send({ embeds: [embed] });
      // });
      
    }
  },
};
