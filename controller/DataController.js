const DataModel = require('../model/DataModel.js')

class DataController {
  constructor() {
  }

  static getForms(req, res, next) { 
    console.log('here')
    res.sendFile(`${__dirname}/dataForms.html`)
  }

  static create (req, res, next) {
    console.log('in create', req.body)
    DataModel.create(req.body).then(response => {
      res.json({ response })
    })
  }
}

module.exports = { DataController }
