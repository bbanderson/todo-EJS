const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('lodash')

const date = require(__dirname + '/date.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
mongoose.connect('mongodb+srv://admin-bbanderson:1111@cluster0-v9rqf.mongodb.net/todoDB', {useNewUrlParser:true, useUnifiedTopology:true})

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

const defaultItems = [slept, breathe, blink]

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})

const List = new mongoose.model('List', listSchema)

app.get('/', function (req, res) {
    
    Item.find(function (err, items) {
        if (err) {
            console.log(err)
        } else {
            if (items.length === 0) {
                Item.insertMany(defaultItems, err => err? console.log(err) : console.log("Added!"))
                res.redirect("/")
            } else {
                const day = date.getDate()
                res.render('list', { listTitle: day, newList: items })
            }       
        }
    })
})

app.get('/:listName', function (req, res) {
    const newListName = _.capitalize(req.params.listName)

    List.findOne({name:newListName}, (err, existListName) => {
        if (!err) {
            if (existListName) {
                console.log("The list is already exist.");
                res.render('list', {listTitle: existListName.name, newList: existListName.items})
            } else {
                console.log("New List"); 
                const newList = new List({
                    name: newListName,
                    items: defaultItems
                })                    
    
                newList.save()
                res.redirect('/' + newList.name)
            }
        } else {
            console.log(err);      
        }      
    })
})

app.post('/', function (req, res) {
    // console.log(userInput)
    const userInput = req.body.todo
    const currentList = req.body.list
    // console.log(req.body)

    const newItem = Item({
        name: userInput
    })

    if (currentList === date.getDate()) {
        newItem.save()
        res.redirect("/")
    } else {
        List.findOne({name: currentList}, (err, result) => {
            if (!err) {
                result.items.push(newItem)
                result.save()
                res.redirect('/' + result.name)
            } else {
                console.log(err);
            }
        })
    }
    // if (req.body.list === 'Work List') {
    //     workItems.push(item)
    //     res.redirect('/work')
    // } else {
    //     todoItems.push(item)
    //     res.redirect('/') 
    // }
})

app.post('/delete', function (req, res) {
    const checkedItemId = req.body.checkbox
    const listName = req.body.listForDelete

    if(listName === date.getDate()) {
        
        // console.log(Item.find((err, items)=> items))
        Item.find((err, items) => {
            console.log(items, checkedItemId);
            
            if (!err) {
                // const fileterdItems = items.filter(item => {
                //     return String(item._id) !== String(checkedItemId)
                // })
                // items = fileterdItems
                
                Item.deleteOne({_id: checkedItemId}, err=> err?console.log(err):console.log("Good"))
                res.redirect('/')
            }
        })
        

    } else {

    List.findOne({name: listName}, (err, result) => {
        
        let items = result.items
        const filteredItems = items.filter(item => {
            return String(item._id) !== String(checkedItemId)
            // item.find({name:"dd"})
        })
        items = filteredItems
        console.log(items);
        
        result.updateOne({items: items}, {items: filteredItems}, err=>console.log(err))
        if (items.length === 0) {
            res.redirect('/')
            result.deleteOne({name: listName}, err=> console.log(err))
        } else {
            res.redirect('/' + listName)
        }
        
        if (!err) {
            // console.log(result.itemsfindOne({name:"Breathed"}));
            
            // if (result.items._id === checkedItemId) {
            //     console.log(checkedItemId);
                
                // result.items.deleteOne({_id: checkedItemId}, (err) => err ? console.log(err) : console.log("Deleted"))
                // res.redirect('/' + listName)
            // }
            // const filteredArray = result["items"].filter(element => {
            //     return element._id !== checkedItemId
            // })
            // if (filteredArray) {
            //     result = filteredArray
            // }
            
        } else {
            console.log(err);
        }
    })
}
    // Item.findByIdAndRemove(checkedItemId, err => err? console.log(err): console.log("Deleted!"))
})

app.get('/work', function (req, res) {
    res.render('list', { listTitle: 'Work List', newList: workItems })
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000, () => console.log('Server has connected!'))
