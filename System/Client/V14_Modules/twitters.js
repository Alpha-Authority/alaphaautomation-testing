const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitters')
        .setDescription('Gives links to the Alaphan twitters.'),
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
                "description": `\`\`Alpha Authority\`\`\nhttps://twitter.com/OfficialRBXAA\n\n\`\`Alpha Insurgency\`\`\nhttps://twitter.com/OfficialRBXAI`,
                timestamp: new Date()
        }
		await interaction.reply({ embeds: [ embedAA ] });
    }
};