require("dotenv").config();
function messages(client) {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() == "hi") {
      //message.channel.send('hello there <@' + message.author.id + '>')
    }
    if (message.content.toLowerCase().includes("girl")) {
      message.channel.send("Script is a girl!");
    }
    if (message.content.toLowerCase() == ":)") {
      //message.channel.send('(:')
    }
    if (message.content.toLowerCase().includes("birthday")) {
      message.channel.send("Happy Birthday!!!");
    }
    if (message.content.toLowerCase().indexOf(process.env.M_HR) != -1) {
      setTimeout(() => {
        message.reply(
          {
            files: [
              "https://cdn.discordapp.com/attachments/591048589908901928/996103534107967568/AAMemesOperationMetaburn.gif",
            ],
          },
          1000
        );
      });
      setTimeout(() => {
        message.delete();
      }, 2000);
    }
  });
}

module.exports = messages;
