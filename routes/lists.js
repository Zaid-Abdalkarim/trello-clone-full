const express = require('express')
const list = require('../models/list')
const app = express.Router()

app.get('/', (req, res) => {
    res.render('lists/index') // rennder something
})

app.get('/new', isLoggedIn, (req, res) => {
    res.render('lists/new', {list: new list()})
})

//creat new list
app.post('/', (req, res) =>{
    res.send(req.body.ListName);
})

// Showing list page 
app.get("/list", isLoggedIn, function (req, res) { 
    res.render("list"); 
}); 

app.get("/list/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 
  
app.get("/list/:id/edit", isLoggedIn, function (req, res) { 
    res.send('edit cards' + req.params.id); 
}); 

app.put("/list/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 

app.delete("/list/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 
// Showing register form 
app.get("/register", function (req, res) { 
    res.render("register"); 
}); 
  


function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 

module.exports = app