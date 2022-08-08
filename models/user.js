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
    display_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }],
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    date_created: {
      type: Date,
      default: Date.now
    }
})

// export user schema
module.exports = mongoose.model('User', userSchema)