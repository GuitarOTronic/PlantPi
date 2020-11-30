 function timedFunctionCall(time, cb) {
  setInterval(() => {
    const currentTime = new Date()
    console.log("Writing temperature data, ", currentTime)
    cb(currentTime)
  }, time);
}

// module.exports = {temperatureTimer}
module.exports = timedFunctionCall