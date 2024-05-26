module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`[ERREUR] La commande ${interaction.commandName} n'a pas été trouvée.`);
                return;
            }

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`[ERREUR] Une erreur s'est produite lors de l'exécution de la commande ${interaction.commandName}:`, error);
                await interaction.reply({
                    content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !',
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {

            const button = client.buttons.get(interaction.customId);

            if (!button) {
                console.error(`[ERREUR] Le bouton ${interaction.customId} n'a pas été trouvé.`);
                return;
            }

            try {
                await button.execute(client, interaction);
            } catch (error) {
                console.error(`[ERREUR] Une erreur s'est produite lors de l'exécution du bouton ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'Une erreur s\'est produite lors de l\'exécution de cette interaction !',
                    ephemeral: true
                });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);

            if (!modal) {
                console.error(`[ERREUR] Le modal ${interaction.customId} n'a pas été trouvé.`);
                return;
            }

            try {
                await modal.execute(client, interaction);
            } catch (error) {
                console.error(`[ERREUR] Une erreur s'est produite lors de l'exécution du modal ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'Une erreur s\'est produite lors de l\'exécution de cette interaction !',
                    ephemeral: true
                });
            }
        } else if (interaction.isSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);

            if (!selectMenu) {
                console.error(`[ERREUR] Le menu de sélection ${interaction.customId} n'a pas été trouvé.`);
                return;
            }

            try {
                await selectMenu.execute(client, interaction);
            } catch (error) {
                console.error(`[ERREUR] Une erreur s'est produite lors de l'exécution du menu de sélection ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'Une erreur s\'est produite lors de l\'exécution de cette interaction !',
                    ephemeral: true
                });
            }
        }
    },
};
