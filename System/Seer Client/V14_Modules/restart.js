const { SlashCommandBuilder } = require('discord.js');
const shell = require('shelljs')
//const cp = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription(`Restarts Alapha Automations.`),
	async execute(interaction) {
        //cp.exec('start restart.sh',
        //    function (error, stdout, stderr) {
        //       console.log(stdout);
        //        console.log(stderr);
        //        if (error !== null) {
        //            console.log(`exec error: ${error}`);
        //        }
        //    });
        //shell.exec('start ./restart.sh')
        return interaction.reply('Restarted Alapha Automations!')
    }
};