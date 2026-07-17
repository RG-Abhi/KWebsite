import express from 'express'
import { dataEvents } from '../lib/dataEvents.js'

const router = express.Router()

router.get('/data/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders?.()

  const send = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`)
  }

  send({ type: 'connected' })

  const onChange = (meta) => send({ type: 'updated', ...meta })

  dataEvents.on('change', onChange)

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n')
  }, 25000)

  req.on('close', () => {
    clearInterval(heartbeat)
    dataEvents.off('change', onChange)
    res.end()
  })
})

export default router
