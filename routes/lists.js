const express = require('express')
const list = require('../models/list')
const app = express.Router()

app.get('/', async (req, res) => {
    try{
        const lists = await list.find({}) // gets all of the lists
        res.render('lists/index', {lists: lists}) // rennder something
    }catch{
        res.redirect('/list')
    }
})

app.get('/new', isLoggedIn, (req, res) => {
    res.render('lists/new', {list: new list()})
})
//creat new list
app.post('/', async (req, res) =>{
    console.log(req.body.name)
    res.send(req.body.name)
    const List = new list({
        name: req.body.name
    })
    try{
        const newList = await List.save()
        res.redirect(`lists`)
        // res.redirect(`list/${newAuthor.id}`)
    }catch{
        res.render('list/new', {
            list: List,
            error_message: 'Error creating List'
        })
    }
})

// app.get("/list/:id", isLoggedIn, function (req, res) { 
//     res.send('show cards' + req.params.id); 
// }); 
  
// app.get("/list/:id/edit", isLoggedIn, function (req, res) { 
//     res.send('edit cards' + req.params.id); 
// }); 

// app.put("/list/:id", isLoggedIn, function (req, res) { 
//     res.send('show cards' + req.params.id); 
// }); 

// app.delete("/list/:id", isLoggedIn, function (req, res) { 
//     res.send('show cards' + req.params.id); 
// }); 
// Showing register form 
app.get("/register", function (req, res) { 
    res.render("register"); 
}); 
  


function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 

module.exports = app