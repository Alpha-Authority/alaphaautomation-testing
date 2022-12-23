/**
 * @name alaphaautomation-testing
 * @description Javascript backend program for the operation of two Discord bots, named Alapha Automata and Alphaseer.
 * @version v2
 * @author Scrippy
 * @source https://github.com/Scrippy/alaphaautomation-testing
 */

console.log(new Date(), `\n---------\nStarting!\n---------`);

// Modules

require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const noblox = require('noblox.js');


// Environment Variables

const token = process.env.TOKEN;
const rbxcookie = process.env.RBXCOOKIE;


// Setup

// -- Discord

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.login(token)
	.then(console.log(new Date(), `| index.js | Logged into Discord.js Client.`));


// -- Noblox

async function startNoblox(){
	const currentUser = await noblox.setCookie(`${rbxcookie}`);
	console.log(new Date(), `| index.js | Logged into Noblox as ${currentUser.UserName} [${currentUser.UserID}]`);
};

startNoblox();


// Startup

// -- FS

const clientFiles = fs.readdirSync(`./System/Client`).filter(file => file.endsWith(`.js`));

for (const file of clientFiles) {
    const clientFile = require(`./System/Client/${file}`);
    clientFile(client, noblox, token);
	console.log(new Date(), `| index.js | Executed ${file} in directory ./System/Client/`);
}