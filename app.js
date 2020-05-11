const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const todoItems = []
const workItems = []

app.get('/', function (req, res) {
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
