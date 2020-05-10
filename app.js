const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use("view engine", "ejs");

app.get("/", function(req, res) {

    const today = new Date()
    const currentDay = today.getDay();
    let day = "";

    if (currentDay === 6 || currentDay === 0) {
        // WEEKEND!
        day = "Weekend";
    } else {
        day = "Weekday";
    }
})

app.listen(3000, ()=>console.log("Server has connected!"))