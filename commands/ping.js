module.exports = {
    name: "ping",
    description: "ping command",
    execute(msg, args) {
        msg.channel.send("pong!");
    }
};