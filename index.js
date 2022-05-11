// require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json")

// create a new client instance
const bot = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})
bot.on("ready", () => {
   console.log(`Client logged in`); 
})
client.login(token)