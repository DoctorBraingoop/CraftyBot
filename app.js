// const { token } = require("./config.json"); 
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

// ! create a new client instance
const bot = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});
bot.commands = new Collection();
module.exports = { bot };

const prefix = "$";

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

// ! require command files
for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const commandNames = require(filePath);
  bot.commands.set(commandNames.name, commandNames);
}

const welcomeEmbed = require("./callbacks/greetEmbed.js");

// ! events
// bot is ready
bot.once("ready", () => {
  console.log(`
${bot.user.id} logged in
Running Node version: ${process.versions.node}
  `);
});

// message create
bot.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  if (!args[0]) return;
  const command = args.shift().toLowerCase();
  // console.log("\r\nCommand captured:", command);
  // console.log("Arguments:", args);

  switch (command) {
    case "ping":
      bot.commands.get("ping").execute(msg, args);
      break;
    case "welcome":
      bot.commands.get("welcome").execute(msg, args);
  }
});

bot.login(process.env.token);
