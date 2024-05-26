const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping") // Nom de la commande
        .setDescription("Obtenir la latence du bot"),
    async execute(interaction) { 
        await interaction.reply(`Ma latence est ${interaction.client.ws.ping} ms`);
    },
};
