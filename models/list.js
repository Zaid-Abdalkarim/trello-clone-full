const mongoose = require('mongoose')

var listSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    ,CardCount: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('List', listSchema)