const express = require('express')
require('dotenv').config()
const bodyParser = require("body-parser")
const axios = require('axios')
const port = process.env.PORT || 3000

const {TOKEN, SERVER_URL} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI


const app = express()
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(URI,async (req,res) =>{
    console.log(req.body);
    console.log(req.headers);

    const chatId = req.body.message.chat.id
    const text = req.body.message.text
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text:text
    })
    return res.send();
})


const init = async () => {
    try{
        const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`,{
            headers: {
                "X-Telegram-Bot-Api-Secret-Token" : "Pranav"
            }
        })
        console.log(res.data);
    }
    catch(e){
        console.log(e.message);
    }
}

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  await init();
})
