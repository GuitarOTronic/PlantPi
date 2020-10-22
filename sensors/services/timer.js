 function temperatureTimer(time, cb) {
  setInterval(() => {
    cb()
  }, time);
}

// module.exports = {temperatureTimer}
export default temperatureTimer