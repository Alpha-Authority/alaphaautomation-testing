const banned = require("../../config/banned.json");
require("dotenv").config();

function messages(client) {
  client.on("messageCreate", async (message) => {
		const msgContent = message.content.toLowerCase();
    
		if (await message.author.bot) return;

    if (await msgContent.includes("girl")) {
      await message.channel.send("Script is a girl!");
    }
    if (await msgContent.includes("birthday")) {
      await message.channel.send("Happy Birthday!!!");
    }
    if (await msgContent.split(" ").every((word) => banned.includes(word))) {
      await message.channel.send({
        files: [
          "https://cdn.discordapp.com/attachments/591048589908901928/996103534107967568/AAMemesOperationMetaburn.gif",
        ],
      });
			await message.delete();
    }
  });
}

module.exports = messages;
