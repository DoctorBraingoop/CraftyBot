require("dotenv").config();
const { Client, Collection } = require("discord.js");
const express = require("express");
const fs = require("fs");
const path = require("node:path");

//------------------------------------
// put in new file
const port = process.env.PORT || 3333;
const app = express();
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, (req, res) => {
  console.log("Express server is online on port: " + port);
});
//------------------------------------

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
  switch (command) {
    case "ping":
      bot.commands.get("ping").execute(msg, args);
      break;
    case "welcome":
      if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.reply("Admin perms required");
        return;
      }
      bot.commands.get("welcome").execute(msg, args);
      break;
  }
});

bot.login(process.env.TOKEN);
