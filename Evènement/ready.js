const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    
    execute(client) {
        console.log(`[CONNEXION] Connecté à ${client.user.username}`);
        setInterval(() => {
            const options = [
                {
                    type: ActivityType.Watching,
                    text: client.guilds.cache.size +" serveurs 🎉",
                    status: 'online'
                },{
                    type:ActivityType.Watching,
                    text: client.users.cache.size + " Utilisateurs",
                    status:'online'
                }
            ]
            const index = Math.floor(Math.random() * (options.length));
            client.user.setPresence({
                activities: [{
                    name: options[index].text,
                    type: options[index].type
                }],
                status: options[index].status
            });
        }, 10 * 1000);
    }
}