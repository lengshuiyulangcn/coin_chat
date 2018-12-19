const WebSocket = require("ws")
const chalk = require('chalk')
const moment = require("moment")

const ws = new WebSocket("wss://realtime-prod.wallstreetcn.com/ws")
ws.on('open', ()=>{
  var message = {"command":"ENTER_CHANNEL","data":{"chann_name":"live"}}
  ws.send(JSON.stringify(message))
  console.log("opened")
})

ws.on('message', (data)=>{
//  var channel = data["data"]["channels"]
  var data = JSON.parse(data);
  if(data && data["data"]["content_text"]) {
		var content = data["data"]["content_text"]
		var sec_time = data["data"]["display_time"]
		var news_time = moment().format("HH:mm:ss")
   console.log(chalk.red("["+ news_time + "]") + chalk.green(content))
	}

})
