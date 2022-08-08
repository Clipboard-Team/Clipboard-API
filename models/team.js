// use the mongoose schema model
const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// sub schema
var roleSchema = mongoose.Schema({
    title: String,
    read: Boolean,
    write: Boolean,
    update: Boolean,
    delete: Boolean,
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},{ _id : false });

// define the schema
const teamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    description: {
        type: String
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    roles: [roleSchema],
    date_created: {
      type: Date,
      default: Date.now
    }
})

// export Team schema
module.exports = mongoose.model('Team', teamSchema)