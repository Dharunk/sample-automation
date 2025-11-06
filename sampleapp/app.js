const express = require('express')
const { createClient } = require('redis')

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = process.env.REDIS_PORT || 6379

const redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` })

redisClient.on('error', (err) => console.error('Redis Client Error', err))

;(async () => {
  await redisClient.connect()
})()

const app = express()
const PORT = 3005

app.get('/', async (req, res) => {
  try {
    const v = await redisClient.incr('hits')
    res.send(`Hello from Sample App! hits=${v}`)
  } catch (e) {
    res.status(500).send('Redis error: ' + e.message)
  }
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(PORT, () => console.log(`sampleapp listening on ${PORT}`))