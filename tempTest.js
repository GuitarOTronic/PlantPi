var ds18b20 = require('ds18b20');

ds18b20.sensors(function (err, ids) {
  // got sensor IDs ...
});

// ... async call
ds18b20.temperature('28-0115721161ff', function (err, value) {
  // console.log('Current temperature is', value);
});

// ... or sync call
// console.log('Current temperature is' + ds18b20.temperatureSync('28-0115721161ff'));

// default parser is the decimal one. You can use the hex one by setting an option
ds18b20.temperature('28-0115721161ff', { parser: 'hex' }, function (err, value) {
  // console.log('Current temperature is', value);
});

function convertCelsiusToFahrenheit(tempC) {
  console.log('converting', tempC)
  return (tempC * 9) / 5 + 32
}

async function getTemperatureF() {
  let tempF
  try {
    await ds18b20.temperature('28-0115721161ff', function (err, value) {
      console.log("getting temp", value)
      tempF = convertCelsiusToFahrenheit(value)
      console.log(convertCelsiusToFahrenheit(value))
      console.log(tempF)
    })
    return tempF
  } catch (err) {
    throw Error("Error getting temp: ", err.message)
  }
}

console.log('Current temperature is' + getTemperatureF());