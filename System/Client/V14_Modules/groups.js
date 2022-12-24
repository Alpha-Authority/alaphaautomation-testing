const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('groups')
        .setDescription('Gives links to the Alaphan groups.'),
    subdata: {
        cooldown: 3
    },
	async execute(interaction) {
		const time = new Date()
        const embedAA = {
                "author": {
                    "name": interaction.client.user.username,
                    "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                },
                color: 0x0099ff,
                "footer": {
                    "text": interaction.guild.name,
                    "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                },
                "description": `\`\`Alapha\`\`\nhttps://www.roblox.com/My/Groups.aspx?gid=7172345\n\n\`\`Alpha Authority\`\`\nhttps://www.roblox.com/My/Groups.aspx?gid=790907\n\n\`\`Alpha Insurgency\`\`\nhttps://www.roblox.com/My/Groups.aspx?gid=3460199`,
                timestamp: new Date()
        }
		await interaction.reply({ embeds: [ embedAA ] });
    }
};