 function timedFunctionCall(time, cb) {
  setInterval(() => {
    const currentTime = new Date()
    cb(currentTime)
  }, time);
}

// module.exports = {temperatureTimer}
module.exports = timedFunctionCall