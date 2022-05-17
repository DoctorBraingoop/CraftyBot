const { token } = require("./config.json"); // require bot token
const { Client, Collection, Intents } = require("discord.js"); 
const fs = require("fs");
const path = require("node:path");

// ! create a new client instance
const bot = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
bot.commands = new Collection();

const prefix = "$";

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

// ! require command files
let commandNames;
for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  commandNames = require(filePath);
  console.log(commandNames);
  bot.commands.set(commandNames.name, commandNames);
}
// ! events
// bot is ready
bot.on("ready", () => {
  console.log(`
${bot.user.id} logged in
Running Node version: ${process.versions.node}
  `);
});

// member joined guild
bot.on("guildMemberAdd", async (member) => {
  const channel = client.channel.cache.get("964967586813059132");
  if (!channel) return;
  const embed = new Discord.MessageEmbed().setTitle(`Member Joined`);
  channel.send(embed);
});

// message create
bot.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  if (!args[0]) return;
  const command = args.shift().toLowerCase();
  console.log("\r\nCommand captured:", command);
  console.log("Arguments:", args);

  switch (command) {
    case "ping":
      bot.commands.get("ping").execute(msg, args);
  }
});

bot.login(token);
