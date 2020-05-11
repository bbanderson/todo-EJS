const express = require('express')
const bodyParser = require('body-parser')

const date = require(__dirname + '/date.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const todoItems = []
const workItems = []

app.get('/', function (req, res) {
    const day = date()
    res.render('list', { listTitle: day, newList: todoItems })
})

app.post('/', function (req, res) {
    // console.log(userInput)
    const item = req.body.todo
    console.log(req.body)
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
