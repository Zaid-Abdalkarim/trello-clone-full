if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express")
const passport = require('passport')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const LocalStrat = require('passport-local')
passportLocalMon = require("passport-local-mongoose")
let User = require("./models/user")

const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname + '/views')
app.set("layout", 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: false, 
    saveUninitialized: false
})); 

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrat(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',() => console.log('connected to mongoose'))

app.get("/", (req, res) => {
    res.render("index"); 
}); 
  
// Showing secret page 
app.get("/secret", isLoggedIn, function (req, res) { 
    res.render("secret"); 
}); 

app.get("/secret/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 
  
app.get("/secret/:id/edit", isLoggedIn, function (req, res) { 
    res.send('edit cards' + req.params.id); 
}); 

app.put("/secret/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 

app.delete("/secret/:id", isLoggedIn, function (req, res) { 
    res.send('show cards' + req.params.id); 
}); 
// Showing register form 
app.get("/register", function (req, res) { 
    res.render("register"); 
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
        res.render("secret"); 
    }); 
}); 
}); 

//Showing login form 
app.get("/login", function (req, res) { 
res.render("login"); 
}); 

//Handling user login 
app.post("/login", passport.authenticate("local", { 
successRedirect: "/secret", 
failureRedirect: "/login"
}), function (req, res) { 
}); 

//Handling user logout  
app.get("/logout", function (req, res) { 
req.logout(); 
res.redirect("/"); 
}); 

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 

app.listen(process.env.PORT || 3000)