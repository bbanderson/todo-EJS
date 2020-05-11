// console.log(module);
module.exports = getDate


function getDate() {
  const today = new Date()
  // const currentDay = today.getDay()
  // let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
  }
  
  const day = today.toLocaleDateString('en-US', options)
  
  // if (currentDay === 6 || currentDay === 0) {
  //     // WEEKEND!
  //     day = "Weekend"
  // } else {
  //     day = "Weekday"
  // }
  return day
}
