require('dotenv').config()
const axios = require("axios");
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { query } = require('express');
const admin = require("firebase-admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription(`View a the point leaderboard.`)
        .addStringOption(option =>
            option.setName('username')
                .setDescription(`View a user's group profile.`)
                .setRequired(false)),
        subdata: {
            cooldown: 3
        },
	async execute(interaction, noblox) {
        var db = admin.database();
        const userdata = []
        //var ref = db.ref('points').child('groups').child('Alpha Authority').child('users')
        //ref.orderByChild('xp').on('value', (querySnapshot) => {
        //    console.log()
        //})
    }
}