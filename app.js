const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

    const today = new Date()
    const currentDay = today.getDay();
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // if (currentDay === 6 || currentDay === 0) {
    //     // WEEKEND!
    //     day = "Weekend";
    // } else {
    //     day = "Weekday";
    // }
    res.render("list", {kindOfDay: day[currentDay], day: day})
})

app.listen(3000, ()=>console.log("Server has connected!"))