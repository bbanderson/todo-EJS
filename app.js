const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const date = require(__dirname + '/date.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
mongoose.connect('mongodb://localhost:27017/todoDB', {useNewUrlParser:true, useUnifiedTopology:true})

const itemSchema = new mongoose.Schema({
    name: String
})

const Item = new mongoose.model('Item', itemSchema)

const slept = new Item({
    name: "Slept Well"
})

const breathe = new Item({
    name: "Breathed"
})

const blink = new Item({
    name: "Blinked Eyes"
})


app.get('/', function (req, res) {
    Item.find(function (err, items) {
        if (err) {
            console.log(err)
        } else {
            if (items.length === 0) {
                Item.insertMany([slept, breathe, blink], err => err? console.log(err) : console.log("Added!"))
                res.redirect("/")
            }
            const day = date.getDate()
            res.render('list', { listTitle: day, newList: items })
        }
    })
})

app.post('/', function (req, res) {
    // console.log(userInput)
    const item = req.body.todo
    // console.log(req.body)
    if (req.body.list === 'Work List') {
        workItems.push(item)
        res.redirect('/work')
    } else {
        todoItems.push(item)
        res.redirect('/')
    }
})

app.get('/work', function (req, res) {
    res.render('list', { listTitle: 'Work List', newList: workItems })
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000, () => console.log('Server has connected!'))
