import { WebSocketServer } from 'ws'
import { setTemp } from "./http_server.js"
import { logger } from "./logger.js";

// const {webSocketServerPort} = require('./config')

/**
 * Parameters
 */
const WSS_PORT = 3003
const subProcess = "webSocketServer"

const wss = new WebSocketServer({
  port: WSS_PORT
})

console.log({subProcess, msg: `Server up on port ${WSS_PORT}`})

wss.on('connection', function connection(ws) {

  logger.info({subProcess, msg: "New connection "})

  ws.on('message', function message(buffer) {

    const data = buffer.toString()
    setTemp(data)
    logger.info({subProcess, data, msg: "Request received"})
    // console.log('received: %s', buffer);
    // console.log({subProcess, message, msg: "Request received"})

      ws.send(JSON.stringify({
        resp: 'received'
      }))
    
  })
})

wss.on('open', function open() {
  logger.info({subProcess, msg: "Client connected"})
})

wss.on('close', function close() {
  logger.info({subProcess, msg: "Client disconnected"})
})

const broadcast = (data) => {
  if (!wss.clients || !wss.clients.size) {
    return
  }

  logger.info({subProcess, data, msg: `Broadcast data to ${wss.clients.size} clients`})

  wss.clients.forEach((ws) => {
    ws.send(data)
  })
}
