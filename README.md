        $$\   $$$$$$\           $$$$$$\  $$\   $$\ 
      $$$$ | $$$ __$$\         $$  __$$\ $$ |  $$ |
      \_$$ | $$$$\ $$ |        $$ /  \__|$$ |  $$ |
        $$ | $$\$$\$$ |$$$$$$\ $$ |$$$$\ $$ |  $$ |
        $$ | $$ \$$$$ |\______|$$ |\_$$ |$$ |  $$ |
        $$ | $$ |\$$$ |        $$ |  $$ |$$ |  $$ |
      $$$$$$\\$$$$$$  /        \$$$$$$  |\$$$$$$  |
      \______|\______/          \______/  \______/ 

# 10GU-AI

# StarCitizen 10GU-AI - Private Discord Bot

## Features
* Music DJ. - In Progress ( Play : Done , Skip:soon, stop/pause:soon )
* Gift a SC drink to user. - in progress (messaging completed: format of message in progress)
* Guilded events Bridge. - To DO 
* RSI Account authentication with Role. - To DO 
* React Role one time react, channel role react. - To DO 
* auto delete commands and replies - keep public channels clean - To DO 
* accept commands on private messages and public text channels - To DO 
* responds as private message - global and per command option - To DO 

# Technical

## Details
* Technical knowledge to setup (bash, json)
* Built as a node.js app
* Run it inside a docker (recommended)
* Extend - add new commands by adding a new file
* uses discord.js


## Setup
1. Make a bot app on discord and get it's token
2. Make a discord server
3. Invite the bot on your discord Ex: https://discordapp.com/oauth2/authorize?&client_id=111111111111&scope=bot&permissions=0  (you need to be a moderator/admin)
4. Enable Privilieged Gateway Intents
    * Make sure you're logged on to the Discord dev portal. Ex: https://discord.com/developers/applications/
    * Click on the bot you want to enable privileged intents for.
    * Navigate to the bot tab on the left side of the screen.
    * Scroll down to the “Privileged Gateway Intents” section and enable PRESENCE INTENT and SERVER MEMBERS INTENT .

*Note: Recommend to make a new bot and server for testing/development process.*

## Tech setup
 1. Clone this repo
 2. Make a config and populate it
```bash
cp config.example.js config.js
nano or vim config.js
```
3. Install the dependencies
```bash
npm install --production
```
4. Run the bot (see below)


*Note: DO not run multiple instances with the same config file, you'll have a bad time.*

If you have trouble with the Discord website you can follow this tutorial [https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token]

### Run as local process

```bash
node index.js
```

### Run it as a Docker container
....TODO....