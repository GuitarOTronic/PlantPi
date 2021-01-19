const PlantModel = require('../model/PlantModel.js')

class PlantController {
  constructor() {
  }

  static getAllData(req, res, next) {
    PlantModel.all().then(response => {
      res.json({ response })
    },
    reason => {
      console.error(reason)
      res.status(500).send("Somethings wrong with the server.")
    })
  }

  static create (req, res, next) {
    const {name, germination_time, grow_schedule, details, type} = req.body
    const insertData = {name, germination_time, grow_schedule: JSON.stringify({grow_schedule}), details}

    PlantModel.create(insertData).then(response => {
      res.json({ response })
    },
    reason => {
      console.error(reason)
      res.status(500).send("Something went wrong with the server.")
    })
  }
}

module.exports = { PlantController }
