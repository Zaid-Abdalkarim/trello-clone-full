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
const listRouter = require('./routes/lists')

app.set("view engine", "ejs")
app.set("views", __dirname + '/views')
app.set("layout", 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 

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

app.use('/', indexRouter)
app.use('/lists', listRouter)

app.listen(process.env.PORT || 3000)