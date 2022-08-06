// use the mongoose schema model
const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
      type: Date,
      default: Date.now,
    }
})

// export user schema
module.exports = mongoose.model('User', userSchema)