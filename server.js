const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const TemperatureController = require('./controller/TemperatureController.js')
const TemperatureRouter = require('./route/TemperatureRouter.js')

const app = express()
const port = process.env.PORT || 8081
dotenv.config()

const temperatureController = new TemperatureController()

temperatureController.startTempRoutine()

app.use(cors())
app.use(bodyParser.json())

app.use('/temperature', TemperatureRouter)

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname+'/home.html'));
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