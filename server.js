import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import TemperatureController from './sensors/Temperature/TemperatureController.js'
import TemperatureRouter from './route/TemperatureRouter.js'

const app = express()
const port = process.env.PORT || 8081
dotenv.config()

const temperatureController = new TemperatureController()
// temperatureController.getTemperatureF()
temperatureController.startTempRoutine()
// app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.json())

app.use('/temperature', TemperatureRouter)

app.use('/', (req, res, next) => {
  res.status(200).json({ message: "Hello"})
})

app.use((req, res) => {
  const status = 404
  const message = `Could not ${req.method} ${req.path}`
  res.status(status).json({ status, message })
});

app.use((err, _req, res, _next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'
  res.status(status).json({ message, status })
})

app.listen(port, () => {
  console.log('listening on port', port)
})