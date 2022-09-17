require('dotenv').config()
const fs = require('fs')
//const Discord = require('discord.js') -- Discord V12
const { Collection } = require('discord.js')
const { REST } = require('@discordjs/rest'); // -- Discord V14
const { Routes } = require('discord.js'); // -- Discord V14
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


//const moduleSystem = './System/Client/Modules'  // -- Discord.js V12
//const moduleNobloxSystem = './System/Client/Noblox_Modules' // -- Discord.js V12
const moduleSystem = './System/Client/V14_Modules' // -- Discord.js V14
const moduleNobloxSystem = './System/Client/V14_Noblox_Modules' // -- Discord.js V14
//

//const moduleFiles = fs.readdirSync(moduleSystem).filter(file => file.endsWith('.js'));  // -- Discord.js V12
//const moduleNobloxFiles = fs.readdirSync(moduleNobloxSystem).filter(file => file.endsWith('.js'));  // -- Discord.js V12
const moduleFiles = fs.readdirSync(moduleSystem).filter(file => file.endsWith('.js')); // -- Discord.js V14
const moduleNobloxFiles = fs.readdirSync(moduleNobloxSystem).filter(file => file.endsWith('.js')); // -- Discord.js V14

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.SA_DATABASEURL
});

//


function commands(client, noblox, token, cl) {
    //client.commands = new Discord.Collection() -- Discord.js V12
    client.commands = new Collection() //-- Discord.js V14
    const commands = []
    for (const file of moduleFiles) {
	    //const commandFile = require('./Modules/' + file); commandFile) // -- Discord.js V12
	    //client.commands.set(`normal.${commandFile.name}`, commandFile) // -- Discord.js V12

        // -- V Discord.js V14 V

        try {
            const commandFile = require(`./V14_Modules/${file}`);
            commands.push(commandFile.data.toJSON());
            client.commands.set(commandFile.data.name, commandFile)
          } catch (err) {console.log(err)}

          // -- ^ Discord.js V14 ^
    }
    for (const file of moduleNobloxFiles) {
	    //const commandFile = require('./Noblox_Modules/' + file);  // -- Discord.js V12
	    //client.commands.set(`roblox.${commandFile.name}`, commandFile) // -- Discord.js V12

        // -- V Discord.js V14 V

        try {
            const commandFile = require(`./V14_Noblox_Modules/${file}`);
            commands.push(commandFile.data.toJSON());
            client.commands.set(commandFile.data.name, commandFile)
          } catch (err) {console.log(err)}

          // -- ^ Discord.js V14 ^
    }

    //const rest = new REST({ version: '10' }).setToken(token); // -- Discord.js V14

    // -- V Discord.js V12 V

    //client.on('message', message => {
    //    if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return
    //    const args = message.content.slice(process.env.PREFIX.length).split(' ');
    //    const commandName = args.shift().toLowerCase()
    //    const command = client.commands.get(`normal.${commandName}`)
	//	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(`normal,.${commandName}`));
    //    const noblox_command = client.commands.get(`roblox.${commandName}`)
	//	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(`roblox.${commandName}`));
    //    if (command){ 
    //        if (command.guildOnly && message.channel.type === 'dm'){ // || noblox_command.guildOnly && message.channel.type.type === 'dm') {
    //            return message.reply('I can\'t execute that command inside DMs!');
    //        } // SEE LINE 55 (message.channel.type.dm)
    //    
    //    
    //        if (command.args && !args.length) {
    //            let reply = `You didn't provide any arguments, ${message.author}!`;
    //            if (command.usage) {
    //                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    //            }
    //            
    //            return message.channel.send(reply);
    //        }
    //    
            //try {
            //    if (command) {
            //        command.execute(message, args, client, admin);
            //    }
            //} catch {
            //    message.reply('Unavailable command!');
            //    console.log('Failed!');
            //}
        //} else if (noblox_command){
        //    if (noblox_command.guildOnly && message.channel.type.type === 'dm') {
        //        return message.reply('I can\'t execute that command inside DMs!');
        //    } // SEE LINE 55 (message.channel.type.dm)
        //
        //
        //    if (noblox_command.args && !args.length) {
        //        let reply = `You didn't provide any arguments, ${message.author}!`;
        //        if (noblox_command.usage){
        //            reply += `\nThe proper usage would be: \`${prefix}${noblox_command.name} ${noblox_command.usage}\``;
        //        }
        //        
        //        return message.channel.send(reply);
        //    }
        //
        //    try {
        //        if (noblox_command) {
        //            noblox_command.execute(message, args, noblox, client, admin)
        //        }
        //    } catch {
        //        message.reply('Unavailable command!');
        //        console.log('Failed!');
        //    }
        //}
    // });
    
    //const rest = new REST({ version: '10' }).setToken(token);

    
    //(async () => {
    //    try {
    //        console.log(`Started refreshing ${commands.length} application (/) commands.`);
    //
    //        const data = await rest.put(
    //            Routes.applicationGuildCommands(client.client_id),
    //            { body: client.commands },
    //        );
    //
    //        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    //    } catch (error) {
    //        console.error(error);
    //    }
    //})();

    
    const rest = new REST({ version: '10' }).setToken(token);
    
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            const data = await rest.put(
                Routes.applicationCommands(process.env.APPLICATION_ID),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();

    //rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands })
    //    .then(data => console.log(`Successfully registered ${data.length} application commands.`))
    //    .catch(console.error);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = client.commands.get(interaction.commandName); //-- Discord.js V14 Tutorial
        //const command = commands.get(interaction.commandName); 
        if (!command) return;
    
        try {
            await command.execute(interaction, noblox);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
}

module.exports = commands;