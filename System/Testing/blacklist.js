const axios = require('axios');
const admin = require("firebase-admin");
const Discord = require('discord.js')

module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
    description: `Add and remove blacklisting for groups and users.`,
    usage: `<add/remove> <user/group> (user id/group id)`,
    args: true,
    execute(message, args, client, admin){
        var db = admin.database();
        if (args[0] == 'add'){ 
            addorremove('add')
        } else if (args[0] == 'remove') {
            addorremove('remove')
        } else {
            return message.reply (`You didn't provide an argument to add or remove! Try "aa>help blacklist" for this commands usage.`)
        }
        function addorremove(value){
            
            if (args[1] == 'group') {

                if (!isNum(args[2])) return message.reply(`You didn't provide an argument that's a number! Try "aa>help blacklist" for this commands usage.`)
                axios.get('https://groups.roblox.com/v1/groups/' + args[1])
                    .then(function (response) {
                       if (!response.data.errors) {
                            var groupName = response.data.name
                            var workinEmbed = new Discord.MessageEmbed()
                        		.setDescription(`Working on the blacklist...`);
                            message.channel.send(workinEmbed).then(message => message.delete({ timeout: 1000, reason: "delete working message" }));
                            axios.get(`https://alapha-c7845-default-rtdb.firebaseio.com/blacklist/groups/${args[1]}.json`)
                                .then(function (response) {
                                    console.log(response.data)
                                    if (!response.data){
                                        gbit(true);
                                    }else{
                                        gbit(false);
                                    }
                                })
                
                            function gbit(anothervalue){
                                if (anothervalue === false && value == 'add'){return message.channel.send(groupName + ` is already a blacklisted group!`)}
                                if (anothervalue === false && value == 'add'){return message.channel.send(groupName + ` is already a blacklisted group!`)}
                                db.ref(`blacklist/groups/${args[1]}`).set({
                                  name: groupName
                                });
                                var doneEmbed = new Discord.MessageEmbed()
                                    .setColor(0xFF8C00)
                                    .setDescription(`Created ${rblx_username}'s profile`)
                                return message.channel.send(doneEmbed)
                            }
                       } else {
                            return message.reply (`You didn't provide an existing group's id!`)
                       }
                    });
    
            } else if (args[1] == 'user') {
                
            } else {
                    return message.reply (`You didn't provide an argument for whether you want to do a user or group! Try "aa>help blacklist" for this commands usage.`)
            }
            axios.get('https://groups.roblox.com/v1/groups/' + args[1])
                .then(function (response) {
                   if (!response.data.errors) {
                       getRobloxUsername(true, response.data.roblox_id)
                   } else {
                       return message.reply
                   }
                });
        }
    }
}  