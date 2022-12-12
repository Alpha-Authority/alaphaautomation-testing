require('dotenv').config()
const axios = require('axios');
const admin = require("firebase-admin");
const Discord = require('discord.js')
//const Array = require('Array')

module.exports = {
    name: 'addxp',
    description: 'Adds XP.',
    guildOnly: false,
    execute(message, args, noblox, client, admin){
        var db = admin.database();

        // Auxiliary Opensource Test
        if (message.channel.type === "dm") return message.channel.send(`That command can't be used through direct messages!`)
        
    	if (message.author.id == "170639211182030850" || message.author.id == "463516784578789376"){
            isAuthorized()
        }else{
    		return message.channel.send(`Sorry ${message.author}, but only the owners can run that command!`).then(message => message.delete({timeout: 5000, reason: "delete"}));
    	}
        
        function isAuthorized(){
        var flag = true;

        // make sure number is a number and is between the specified numberss
        console.log(args[0], args[1])
    	if (!args[0] || isNaN(Number(args[0])) || Number(args[0]) < 1){ // || Number(args[1]) > client.config.max_experiencePoints){
    		var badEmbed = new Discord.MessageEmbed()
    			.setColor(0xf54242)
    			.setDescription(`You must specify a number for me to add XP points to the specified users\n\n**aa>addxp # username1 username2 etc**`)
    		return message.reply(badEmbed);
    	};
    
    	// if no usernames present, error!
    	if (!args[1]){
    		var badEmbed = new Discord.MessageEmbed()
    			.setColor(0xf54242)
    			.setDescription(`Please provide the ROBLOX username that you want to add XP to\n\n**aa>addxp # username1, username2, etc**`)
    		return message.reply(badEmbed);
    	};
    
    	// collect usernames into an array
        const arrayFinder  = function (a) {
            if (!a.indexOf(' ') != -1) {
                return a.split(' ')

            }else{
                return a
            }
        };
        
        let userArray = arrayFinder(message.content.slice(process.env.PREFIX.length + 7 + args[0].length))
    	
    	// remove duplicates
    	//userArray = Array.from(new Set(userArray));
    
    	// number variable
    	var addPoints = Number(args[0]);
        console.log(addPoints)
    
    	// tell user that we're still working on command..
    	var workinEmbed = new Discord.MessageEmbed()
    		.setDescription(`Working on updating user(s)...`)
    
    	message.channel.send(workinEmbed).then(message => message.delete({ timeout: userArray.length * 1000 + 1000, reason: "delete working message" }));
    
    
    	// all roles
    	//var roles;
    	//await axios.get(`https://api.roblox.com/groups/${groupID}`)
    	//	.then(function (response) {
    	//		roles = response.data.Roles;
    	//	});
    
    	// for loop to go through array
    	for (let i = 0; i < userArray.length; i++) {
          setTimeout(function timer() {
            //function sleep (time) {
            //  return new Promise((resolve) => setTimeout(resolve, time));
            //}

// Usage!    function sleepFor(sleepDuration){
        
            //sleep(1000).then(() => {
    // Do something after the sleep!
    		// username & id & boolean to get out
            console.log
        	var rblx_username = userArray[i];
            //var rblx_username = args[1]
            var rblx_id;
            //var flag = false;
            //var blacklisted = false;
    
                // grab id if possible
            console.log(rblx_username)
            var usernameParam = {
                "usernames": [
                    rblx_username
                ],
                "excludeBannedUsers": true
            }
            axios.post(`https://users.roblox.com/v1/usernames/users`, usernameParam)
                .then(function (usernameresponse){
                    // wow user doesn't exist
                    console.log(usernameresponse.data)
                    if (usernameresponse.data.data.length == 0){
                        //flag = true;
                        var badEmbed = new Discord.MessageEmbed()
                            .setColor(0xf54242)
                            .setDescription(`User **${rblx_username}** doesn't exist!`)
                        console.log(badEmbed)
                        return message.channel.send(badEmbed);
                    }else{
                        // user does exist
                        rblx_username = usernameresponse.data.data[0].name;
                        rblx_id = usernameresponse.data.data[0].id;
                        
    
    
                        axios.get(`${process.env.SA_DATABASEURL}/points/groups/Alpha Authority/users/${rblx_id}.json`)
                            .then(function (response) {
                                var current_points;
                                console.log(response.data)
                                if (!response.data){
                                    current_points = 0;
                                    //flag = true;
                                    flagit(true, current_points);
                                }else{
                                    current_points = Number(response.data.xp);
                                    flagit(false, current_points);
                                }
                            })
                        }
                        // new total points added together
                        function flagit(flag, current_points){
                            
                            var new_total_points = current_points + addPoints;
                        
                            if (flag){//&& blacklisted != true){
                                db.ref(`points/groups/Alpha Authority/users/${rblx_id}`).set({
                                  xp: Number(new_total_points)
                                });
                                getThumbnail(true, rblx_username, rblx_id)
                                // embed message to channel
                               
                                //var doneEmbed = new Discord.MessageEmbed()
                                //    .setColor(0xFF8C00) 
                                //    .setDescription(`Created ${rblx_username}'s profile`)
                                //message.channel.send(doneEmbed)
                    
                            }else{
                                db.ref(`points/groups/Alpha Authority/users/${rblx_id}`).set({
                                  xp: Number(new_total_points)
                                });
                                getThumbnail(false, rblx_username, rblx_id)
                                // embed message to channel
                                //var doneEmbed = new Discord.MessageEmbed()
                                //    .setColor(0x28F6FF)
                                //    .setDescription(`Updated ${rblx_username}'s profile`)
                                //message.channel.send(doneEmbed)
                                
                            }    
                        }
                        function getThumbnail(flag, rblx_username, rblx_id){
                            axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${rblx_id}&size=720x720&format=Png&isCircular=false`)
                                .then(function (response){
                                    console.log(response.data)
                                    if (response.data.data.length == 0){
                                        //finalEmbed(flag, rankresponse, rblx_username, rblx_id, false, false)
                                        //const thumbnail = response.data.data[0].imageUrl
                                        noblox.getRankNameInGroup(args[0], rblx_id)
                                        //axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=180x180&format=Png`)
                                            .then(function (rankname) {
                                                finalEmbed(flag, rblx_username, rblx_id, thumbnail, false)

                                            })
                                            .catch(error => console.log(error));
                                    }else{
                                        const thumbnail = response.data.data[0].imageUrl
                                        //inalEmbed(flag, rankresponse, rblx_username, rblx_id, thumbnail, true)
                                        noblox.getRankNameInGroup(args[0], rblx_id)
                                            //axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userid}&size=180x180&format=Png`)
                                            .then(function (rankname) {
                                                finalEmbed(flag, rblx_username, rblx_id, thumbnail, true)
                                            })
                                            .catch(error => console.log(error));
                                    }
                                })
                                .catch(error => console.log(error));
                        }
                        function finalEmbed(flag, rblx_username, rblx_id, thumbnail, trueThumbnail) {
                            if (!flag && !trueThumbnail){
                                var infoEmbed = new Discord.MessageEmbed()
                                    .setTitle(`${rblx_username}'s Profile`)
                                    .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                    .setColor(0x28F6FF)
                                    .setDescription(`Updated ${rblx_username}'s profile`)

                                    //.setThumbnail(response);
                                message.channel.send( {embed: infoEmbed } )
                            } else if (!flag && trueThumbnail){
                                var infoEmbed = new Discord.MessageEmbed()
                                    .setTitle(`${rblx_username}'s Profile`)
                                    .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
                                    .setColor(0x28F6FF)
                                    .setDescription(`Updated ${rblx_username}'s profile`)
                                    .setThumbnail(thumbnail);
                                message.channel.send( {embed: infoEmbed } )
                            } else if (flag && !trueThumbnail){
                                var infoEmbed = new Discord.MessageEmbed()
                                    .setColor(0xFF8C00)
                                    .setDescription(`Created ${rblx_username}'s profile`)
                                    
                                 //.setThumbnail(response);
                                message.channel.send( {embed: infoEmbed } )
                            } else if (flag && trueThumbnail){
                                var infoEmbed = new Discord.MessageEmbed()
                                    .setColor(0xFF8C00)
                                    .setDescription(`Created ${rblx_username}'s profile`)
                                    .setThumbnail(thumbnail);
                                    

                                // return embed
                                message.channel.send( {embed: infoEmbed })
                            }
                        }
                    
                    })
                    
                    // error message
                    console.log(flag)
                    //if (flag){
                    //	var badEmbed = new Discord.MessageEmbed()
                    //		.setColor(0xf54242)
                    //		.setDescription('Test')//`User **${rblx_username}** doesn't exist!`)
                    //    console.log(badEmbed)
                    //	message.channel.send(badEmbed);
                    //	continue;
                    //};
                    //checks if a user is blacklisted. Cannot give blacklisted individuals experience now.
                    //axios.get(`${process.env.SA_DATABASEURL}guilds/${message.guild.id}/blacklist/${rblx_id}.json`)
                    //	.then(function (response) {
                    //		if (response.data != null){
                    //			blacklisted = true
                    //			var badEmbed = new Discord.MessageEmbed()
                    //			.setColor(0xf54242)
                    //			.setDescription(`User **${rblx_username}** is blacklisted!`)
                    //			(message.channel.send(badEmbed));
                    //		}
                    //	})
                    // get total points so far from profile
          }, i * 1000);
        }
                     
              setTimeout(function timer() {
                 message.channel.send(`Updated everyone's profile!`);
              }, userArray.length * 1000 + 1000);
        }
    }
}
