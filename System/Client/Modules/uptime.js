module.exports = {
    name: 'uptime',
    description: 'Uptime..',
    execute(message, args) {
        //uptime = message.client.uptime
        //days = Math.floor(uptime / 86400000)
        //hours = Math.floor((uptime / 3600000) % 24) 
        //minutes = Math.floor((uptime / 60000) % 60)
        //seconds = Math.floor((uptime / 1000) % 60)
        //return message.channel.send(days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
        
        uptime = message.client.uptime
        days = Math.floor(uptime / 86400000)
        hours = Math.floor((uptime / 3600000) % 24) 
        minutes = Math.floor((uptime / 60000) % 60)
        seconds = Math.floor((uptime / 1000) % 60)
 	    const embedAA = {
                "author": {
                    "name": message.client.user.username,
                    "icon_url": message.client.user.displayAvatarURL({ format: "png", dynamic: true })
                },
                color: 0x0099ff,
                "footer": {
                    "text": message.guild.name,
                    "icon_url":  message.guild.iconURL({ format: "png", dynamic: true })
                },
                "description": days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.",
                timestamp: new Date()
        }
        return message.channel.send({ embed: embedAA });
    }
}