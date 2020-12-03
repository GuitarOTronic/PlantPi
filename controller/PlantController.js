const PlantModel = require('../model/TemperatureModel.js')

class PlantController {
  constructor() {
  }

  static getAllData(req, res, next) {
    PlantModel.getAllData().then(response => {
      res.json({ response })
    })
  }

  static create (req, res, next) {
    PlantModel.create(req.body).then(response => {
      res.json({ response })
    })
  }
}

module.exports = { PlantController }
