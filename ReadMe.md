
# Discord.js v14 Template

Template de démmarage pour votre bot Discord



## Installation

Voici comment installer votre bot grâce à ce template

```bash
  npm init
  npm install
  node bot.js
```

## Documentation

[Discord.js Guide](https://discordjs.guide)
[Discord.js](https://discordjs.dev/)


## Caractéristiques

- Commande Slash 
```js
const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nomdelacommande")
        .setDescription("descriptiondelacommande"),
    async execute(interaction) {
        //votre code
    }
}
```
- Evènement
```js
module.exports = {
    name: 'nomdeleventenanglais', //messageCreate, interactionCreate...
    execute(client) {
       //votre code
    }
}
```
- Intéractions (bouton, menu de séléction, modal)
```js
module.exports = {
    data: {
        name:"iddelinteraction"
    },
    async execute(interaction) {
        //votre code
    }
}
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

Rejoindre le serveur support:
[One'Bot Support](https://discord.gg/GENJ8qUARH)
