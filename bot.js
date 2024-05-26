const { token, db, id } = require("./configuration/bot.json");
const { Client, Collection, Intents, REST, Routes, EmbedBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const client = new Client({ intents: 3276799  });

// Collections des données
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

// COMMANDE SLASH HANDLER
const commands = [];
const foldersPath = path.join(__dirname, "SlashCommandes");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON()); // Ajout de la commande au tableau
            console.log(`[OK] La commande ${filePath} est chargée avec succès !`);
        } else {
            console.log(`[AVERTISSEMENT] La commande ${filePath} n'est pas chargée, car il manque une propriété : "data" et / ou "execute"`);
        }
    }
}

// ENREGISTREMENT DES COMMANDES SLASH
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
    try {
        console.log(`[APP] Enregistrement de ${commands.length} commandes en cours...`);
        const data = await rest.put(
            Routes.applicationCommands(id),
            { body: commands },
        );
        console.log(`[APP] Enregistrement effectué sur ${data.length} commandes !`);
    } catch (error) {
        console.error(error);
    }
})();

// EVENT HANDLER
const eventsPath = path.join(__dirname, 'Evènement');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// COMPONENTS HANDLER
const componentsPath = path.join(__dirname, './Interaction');

// BOUTON HANLER
const buttonsPath = path.join(componentsPath, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = require(filePath);
    client.buttons.set(button.data.name, button);
}

// MODAL HANDLER
const modalsPath = path.join(componentsPath, 'modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));
for (const file of modalFiles) {
    const filePath = path.join(modalsPath, file);
    const modal = require(filePath);
    client.modals.set(modal.data.name, modal);
}

// SELECT-MENU HANDLER
const selectMenusPath = path.join(componentsPath, 'selectMenus');
const selectMenuFiles = fs.readdirSync(selectMenusPath).filter(file => file.endsWith('.js'));
for (const file of selectMenuFiles) {
    const filePath = path.join(selectMenusPath, file);
    const selectMenu = require(filePath);
    client.selectMenus.set(selectMenu.data.name, selectMenu);
}

console.log('[INTERACTION] Tous les intéractions sont chargé avec succès !');

// Anti-crash Token
if (!token) {
    console.error("[ERREUR] Le token est manquant dans configuration/bot.json");
    process.exit(1);
}

// MongoDB
mongoose.connect(db)
    .then(() => console.log('[DATABASE] MongoDB est connecté !'))
    .catch(err => console.error('[DATABASE] Erreur de connexion à MongoDB:', err));

// Connexion du bot
client.login(token);

// Anti-Crash
process.on('unhandledRejection', error => {
    console.error('[Anti-Crash] Unhandled Rejection:', error);
});
process.on('uncaughtException', error => {
    console.error('[Anti-Crash] Uncaught Exception:', error);
});
