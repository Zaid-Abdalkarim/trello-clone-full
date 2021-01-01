const express = require('express')
const passport = require('passport')
const app = express.Router()


app.get("/", (req, res) => {
    res.render("index"); 
}); 
  
// Handling user signup 
app.post("/register", function (req, res) { 
    var username = req.body.username 
    var password = req.body.password 
    User.register(new User({ username: username }), 
            password, function (err, user) { 
        if (err) { 
            console.log(err); 
            return res.render("register"); 
        } 

        passport.authenticate("local")( 
            req, res, function () { 
            res.render("main-list-html"); 
        }); 
    }); 
}); 
    
//Showing login form 
app.get("/login", function (req, res) { 
res.render("login"); 
}); 

//Handling user login 
app.post("/login", passport.authenticate("local", { 
successRedirect: "/list", 
failureRedirect: "/login"
}), function (req, res) { 
}); 

//Handling user logout  
app.get("/logout", function (req, res) { 
req.logout(); 
res.redirect("/"); 
}); 

// Showing list page 
app.get("/list", isLoggedIn, function (req, res) { 
    res.render("main-list-html"); 
}); 

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 

module.exports = app