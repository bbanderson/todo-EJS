const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use("view engine", "ejs");

app.listen(3000, ()=>console.log("Server has connected!"))