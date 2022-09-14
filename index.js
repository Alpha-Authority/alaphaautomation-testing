// By ScriptIntelligence

// Structure Setup

// node_modules
// modules
// settings
// events
// startup
// functions

// // //

const fs = require('fs');
const discord = require('discord.js');
require('dotenv').config()

// // //

const clientSystem = './System/Client';

// // //

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

//

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


//


client.login(token);

//

const clientFiles = fs.readdirSync(clientSystem).filter(file => file.endsWith('.js'));

for (const file of clientFiles) {
    const clientFile = require(clientSystem + '/' + file)
    clientFile(client);
}

//const clientFilesMjs = fs.readdirSync(clientSystem + '/Mjs').filter(file => file.endsWith('.mjs'));

//for (const file2 of clientFilesMjs) {
//    const clientFile2 = require(clientSystem + '/Mjs/' + file2)
    //clientFile2(client);
//}

// node -e "console.log(require('dotenv').config())"