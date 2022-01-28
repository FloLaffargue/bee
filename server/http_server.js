import express from 'express'
import cors from 'cors'
// import { logger } from './logger.js'

let app = express()

app.use(cors())
app.use(express.json());
app.listen(3000, () => {
  console.log('Listening on port 3000')
  // logger.info('Listening...')
})

let temp = {
  temp: "18°C",
  humidity: "20%"
}

app.get("/bees", (req, res, next) => {
  res.status(200)
  res.send(`
    <h1>Température: ${temp.temp}°C</h1>
    <h1>Humidité: ${temp.humidity}%</h1>
  `)
  next()
})


// No matching route
app.use((req, res, next) => {
  if (!req.route) {
    res.status(404)
    res.send('Not found')
  }
  next()
})

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: err.message
  })
  console.log(err.message)
  next()
})

// Register request into logger
app.use((req, res, next) => {
  const { headers, url, method } = req
  const data = {
    req: { headers, url, method },
    res: {
      statusCode: res.statusCode
    }
  }
  if (res.statusCode >= 400)  {
    logger.error(data)
  } else {
    logger.info(data)
  }
})

export function setTemp (data) {
  temp = JSON.parse(data)
}

