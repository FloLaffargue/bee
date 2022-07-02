// Web socket

import config from "./config.js";
import WebSocket from 'ws'

let ws
let connected = false
let logPrefix = 'WebSocket'

setInterval(() => {
  if (!connected) {
    connect()
  }
}, 2000)

function connect () {

  console.log(`Trying to connect to Websocket server: ${config.wss.ip}:${config.wss.port}`)
  ws = new WebSocket(`ws://${config.wss.ip}:${config.wss.port}`);
  connected = true

  ws.onopen = (() => {
    console.log(`${logPrefix} Connected`)
  })

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.info(`${logPrefix} Received message: `, data)
    // callback(data)
  }

  ws.onclose = (event) => {
    console.log(`${logPrefix} Closed, code=${event.code} reason=${event.reason}`)
    ws?.close()
    connected = false
  }

  ws.onerror = (err) => {
    console.error(`${logPrefix} Error, message=${err}`)
    connected = false
    ws?.close()
  }
}

export { ws }
