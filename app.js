// require the necessary discord.js classes
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const path = require("node:path");

const $prefix = "$";

// ! create a new client instance
const bot = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

bot.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  bot.commands.set(command.name, command);
}

// ! events
bot.on("ready", () => {
  console.log(`
${bot.user.id} logged in
Node version: ${process.versions.node}
  `);
});
bot.on("guildMemberAdd", async (member) => {
  const channel = client.channel.cache.get("964967586813059132");
  if (!channel) return;
  const embed = new Discord.MessageEmbed().setTitle(`Member Joined`);
  channel.send(embed);
});
bot.on("messageCreate", (msg) => {
  if (!msg.content.startsWith($prefix) || msg.author.bot) return;
  const args = msg.content.slice($prefix.length).split(/ +/);
  if (!args[0]) return;
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      bot.commands.get("ping").execute(msg, args);
  }

  console.log(args);
});

bot.login(token);

//mdn String.slice
//mdn Array.shift
