const WebSocket = require("ws")
const chalk = require('chalk')
const moment = require("moment")
const fs = require("fs")
const out = fs.createWriteStream('info.log', {flags:'a'});
const err = fs.createWriteStream('error.log', {flags:'a'});
const logger = new console.Console(out,err);

const ws = new WebSocket("wss://realtime-prod.wallstreetcn.com/ws")
ws.on('open', ()=>{
  try {
    var message = {"command":"ENTER_CHANNEL","data":{"chann_name":"live"}}
    ws.send(JSON.stringify(message))
    console.log("opened")
  } catch(e) {
    logger.error(new Error(e));
  }
})

ws.on('message', (data)=>{
  try {
//var channel = data["data"]["channels"]
    var data = JSON.parse(data);
    if(data && data["data"]["content_text"]) {
        var content = data["data"]["content_text"]
        var sec_time = data["data"]["display_time"]
        var news_time = moment().format("HH:mm:ss")
        var catagory = data["data"]["channels"].toString()
        if (data["data"]["channels"].indexOf("forex-channel") > -1) {
          console.log(chalk.red("["+ news_time + "]") + chalk.green(content))
        } else if (data["data"]["channels"].indexOf("us-stock-channel") > -1) {
          console.log(chalk.red("["+ news_time + "]") + chalk.blue(content))
        }
        logger.log("["+ news_time + "] " + catagory + " || " + content)
      }
  } catch(e) {
    logger.error(new Error(e));
  }
})
