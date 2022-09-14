require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const admin = require('firebase-admin')

//

const SA_PRIVATE_KEY = process.env.SA_PRIVATE_KEY.split("\\n").join("\n")
//console.log(`${SA_PRIVATE_KEY}`)

//var serviceAccount = require('./Modules/Firebase/alapha-c7845-firebase-adminsdk-czfz3-7ff2f06b08.json')
var serviceAccount = {
  type: process.env.SA_TYPE,
  project_id: process.env.SA_PROJECT_ID,
  private_key_id: process.env.SA_PRIVATE_KEY_ID,
  private_key: SA_PRIVATE_KEY,
  client_email: process.env.SA_CLIENT_EMAIL,
  client_id: process.env.SA_CLIENT_ID,
  auth_uri: process.env.SA_AUTH_URI,
  token_uri: process.env.SA_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SA_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL
}

const moduleSystem = './System/Client/Modules'

//

const moduleFiles = fs.readdirSync(moduleSystem).filter(file => file.endsWith('.js'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.SA_DATABASEURL
});

//


function commands(client) {
    client.commands = new Discord.Collection()
    for (const file of moduleFiles) {
	    const commandFile = require('./Modules/' + file);
	    client.commands.set(commandFile.name, commandFile)
    }
    client.on('message', message => {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return
        const args = message.content.slice(process.env.PREFIX.length).split(' ');
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        if (command.guildOnly && message.channel.type === 'dm') {
    	    return message.reply('I can\'t execute that command inside DMs!');
        } // SEE LINE 55 (message.channel.type.dm)
    
    
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
    
            if (command.usage) {
    			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    		}
    
    		return message.channel.send(reply);
    	}
    
        try {
            command.execute(message, args, client, admin);
        } catch {
            message.reply('Unavailable command!');
            console.log('Failed!');
        }
    });
}

module.exports = commands;