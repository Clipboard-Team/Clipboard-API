// use the mongoose schema model
const { string } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// sub schema
var sprintSchema = mongoose.Schema({
    number: Number,
    title: String,
    description: String,
    date_created: Date
});

// sub schema
var taskSchema = mongoose.Schema({
    title: String,
    creator: String,
    assigned: String,
    stage: String,
    description: String,
    sprint_number: Number,
    data_created: Date,
    date_updated: Date
});

// define the schema
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stages: {
        type: [String],
        required: true
    },
    sprint_length: {
        type: Number,
        required: true
    },
    sprint_start_day: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    description: {
        type: String
    },
    sprints: [sprintSchema],
    tasks: [taskSchema],
    date_created: {
      type: Date,
      default: Date.now,
    }
})

// export Project schema
module.exports = mongoose.model('Project', projectSchema)