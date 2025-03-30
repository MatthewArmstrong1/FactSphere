const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setchannel')
		.setDescription('Sets the current bot fact channel'),
	async execute(interaction) {},
};