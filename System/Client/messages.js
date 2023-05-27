const banned = require("../../config/banned.json");
require("dotenv").config();

function messages(client) {
  client.on("messageCreate", (message) => {
		const msgContent = message.content.toLowerCase();
    
		if (message.author.bot) return;

    if (msgContent.includes("girl")) {
      message.channel.send("Script is a girl!");
    }
    if (msgContent.includes("birthday")) {
      message.channel.send("Happy Birthday!!!");
    }
    if (msgContent.split(" ").every((word) => banned.includes(word))) {
      message.channel.send({
        files: [
          "https://cdn.discordapp.com/attachments/591048589908901928/996103534107967568/AAMemesOperationMetaburn.gif",
        ],
      });
      message.delete();
    }
  });
}

module.exports = messages;
