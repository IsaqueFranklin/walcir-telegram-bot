const telegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow');
const youtube = require('./youtube')
const youtube2 = require('./youtube2')

const token = 'seu token aqui'

const bot = new telegramBot(token, {polling: true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text)

    let responseText = dfResponse.text;

    if (dfResponse.intent === 'Zueira no youtube'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.buteco);
    }

    if (dfResponse.intent === 'Um conto de fadas'){
        responseText = await youtube2.searchVideoURL2(responseText, dfResponse.fields.butecão);
    }

    bot.sendMessage(chatId, responseText);
})