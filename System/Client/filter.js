const banned = require("../../config/banned.json");

const Filter = require("bad-words"),
  filter = new Filter({ emptyList: true });
filter.addWords(...banned);

async function filterMessages(client) {
  await client.on("messageCreate", async (message) => {
    const msgContent = message.content.toLowerCase();
    if ((await msgContent.filter()) !== msgContent) {
      await message.delete();
      // await message.channel.send({
      // 	files: [
      // 		"https://cdn.discordapp.com/attachments/591048589908901928/996103534107967568/AAMemesOperationMetaburn.gif",
      // 	],
      // });
    }
  });
}

module.exports = filter;
