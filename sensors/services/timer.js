 function temperatureTimer(time, cb) {
  setInterval(() => {
    console.log("call back", new Date())
    cb()
  }, time);
}

// module.exports = {temperatureTimer}
export default temperatureTimer