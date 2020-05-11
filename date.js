// console.log(module);
exports.getDate = function () {
  const today = new Date()
  // const currentDay = today.getDay()
  // let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
  }
  
  return today.toLocaleDateString('en-US', options)
  
  // if (currentDay === 6 || currentDay === 0) {
  //     // WEEKEND!
  //     day = "Weekend"
  // } else {
  //     day = "Weekday"
  // }
}
