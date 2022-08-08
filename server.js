// reference environment variables using dotenv package
require('dotenv').config()

// install server dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')

// connect to mongodb database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// import token
const verifyToken = require("./routes/validate-token");

// tell express to accept JSON as the data format
app.use(express.json())

// enable cors
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const teamsRouter = require('./routes/teams')
app.use('/teams', teamsRouter)

const projectsRouter = require('./routes/projects')
app.use('/projects', projectsRouter)

// test out server is working
let server = app.listen(process.env.PORT || 3000, () => {
    console.log('server started')
    console.log("listening at port: ", server.address().port)
})

/**
 * TODO:
 * - create the database structure
 * 
 * user
 * -------------
 * username
 * display_name
 * password
 * image
 * teams
 * roles
 * date_created
 * 
 * team
 * -------------
 * title
 * description
 * projects
 * members
 * roles
 * date_created
 * 
 * project
 * -------------
 * title
 * description
 * team
 * stages
 * sprints
 * sprint_length
 * sprint_start_day
 * tasks
 * date_created
 * 
 * role
 * -------------
 * title
 * team
 * project
 * read
 * write
 * update
 * delete
 * 
 * sprint
 * -------------
 * number
 * title
 * description
 * tasks
 * date_created
 * 
 * task
 * -------------
 * title
 * description
 * attachments
 * date_created
 * date_updated
 * project
 * sprint
 * creator
 * assigned
 * stage
 */

/**
 * TODO:
 * - work on teams routers DONE
 * - work on project routes
 * - update comments for all routes
 */