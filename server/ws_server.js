import { WebSocketServer } from 'ws'
import { setTemp } from "./http_server.js"

// const {logger} = require('./logger.js')
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
  console.log({subProcess, msg: "New connection "})

  ws.on('message', function message(buffer) {

    const data = buffer.toString()
    setTemp(data)
    // console.log('received: %s', buffer);
    // console.log({subProcess, message, msg: "Request received"})
    // console.log({subProcess, data, msg: "Request received"})

      ws.send(JSON.stringify({
        resp: 'received'
      }))
    
  })
})

wss.on('open', function open() {
  console.log({subProcess, msg: "Client connected"})
})

wss.on('close', function close() {
  console.log({subProcess, msg: "Client disconnected"})
})

const broadcast = (data) => {
  if (!wss.clients || !wss.clients.size) {
    return
  }

  console.log({subProcess, data, msg: `Broadcast data to ${wss.clients.size} clients`})

  wss.clients.forEach((ws) => {
    ws.send(data)
  })
}

//
// appendDataScannedCallback((data, meta) => {
//   broadcast(JSON.stringify({
//     'type': 'scan',
//     'payload': data,
//     'meta': meta
//   }))
// })
