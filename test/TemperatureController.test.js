const chai = require('chai')
const TemperatureController = require('../sensors/Temperature/TemperatureController.js')
const expect = chai.expect
let temperatureData
describe("Temperature Controller", () => {
  const tempController = new TemperatureController()
  it("Should calculate degrees in Fahrenheit", () => {
    const expected = 32
    const result = tempController.convertCelsiusToFahrenheit(0)
    expect(result).to.equal(expected)
  })
  it("Should save data json file", () => {
    const now = new Date().toISOString()
    const currentTemp = {
      time: now,
      temperature: 64
    }
    tempController.saveTempDataToJSON(currentTemp)

  })
  it("Should get temperature data", () => {
    const data = tempController.getAllTempData()

    // expect(temperatureData).to.deep.equal(data)
  })
  it('SHould get api key', async () => {
    const { key } = await tempController.getApiKey()
    expect(key).to.equal('e61b32077832169b4957bd3bd9fd36c4')
  })
})