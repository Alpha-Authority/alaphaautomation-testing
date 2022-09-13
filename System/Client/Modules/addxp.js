const axios = require('axios');
const admin = require("firebase-admin");
const Discord = require('discord.js')
//const Array = require('Array')

module.exports = {
    name: 'addxp',
    description: 'Adds XP.',
    execute(message, args, client, admin){
        var db = admin.database();

        // Auxiliary Opensource Test
        if (message.channel.type === "dm") return message.channel.send(`That command can't be used through direct messages!`)
        
    	if (message.author.id == "170639211182030850"){
            isAuthorized()
        }else{
    		return message.channel.send(`Sorry ${message.author}, but only the owner can run that command!`).then(message => message.delete({timeout: 5000, reason: "delete"}));
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
            if (a.indexOf(' ') != -1) {
                return a.split(' ')

            }else{
                return a
            }
        };
        let userArray = arrayFinder(message.content.slice(10 + args[0].length))
    	
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
        	var rblx_username = userArray[i];
            //var rblx_username = args[1]
            var rblx_id;
            //var flag = false;
            //var blacklisted = false;
    
                // grab id if possible
            var usernameParam = {
                "usernames": [
                    rblx_username
                ],
                "excludeBannedUsers": true
            }
            axios.post(`https://users.roblox.com/v1/usernames/users`, usernameParam)
                .then(function (response){
                    // wow user doesn't exist
                    console.log(response.data)
                    if (response.data.length == 0){
                        //flag = true;
                        var badEmbed = new Discord.MessageEmbed()
                            .setColor(0xf54242)
                            .setDescription(`User **${rblx_username}** doesn't exist!`)
                        console.log(badEmbed)
                        return message.channel.send(badEmbed);
                    }else{
                        // user does exist
                        rblx_username = response.data.data[0].name;
                        rblx_id = response.data.data[0].id;
                        
    
    
                        axios.get(`https://alapha-c7845-default-rtdb.firebaseio.com/points/users/${rblx_id}.json`)
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
                                db.ref(`points/users/${rblx_id}`).set({
                                  xp: Number(new_total_points)
                                });
                                // embed message to channel
                                var doneEmbed = new Discord.MessageEmbed()
                                    .setColor(0xFF8C00)
                                    .setDescription(`Created ${rblx_username}'s profile`)
                                message.channel.send(doneEmbed)
                    
                            }else{
                                db.ref(`points/users/${rblx_id}`).set({
                                  xp: Number(new_total_points)
                                });
                                // embed message to channel
                                var doneEmbed = new Discord.MessageEmbed()
                                    .setColor(0x28F6FF)
                                    .setDescription(`Updated ${rblx_username}'s profile`)
                                message.channel.send(doneEmbed)
                                
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
                    //axios.get(`https://alapha-c7845-default-rtdb.firebaseio.com/guilds/${message.guild.id}/blacklist/${rblx_id}.json`)
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
    
