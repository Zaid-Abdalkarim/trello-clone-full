const mongoose = require('mongoose')

var listSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    ,CardCount: {
        type: Number
    }
})

module.exports = mongoose.model('List', listSchema)