// require express and schema dependencies
const express = require('express')
const router = express.Router()
var _ = require('underscore');
const Project = require('../models/project')
const Team = require('../models/team')

/*  Get All Projects
    - send nothing
    - returns list of all projects
    - requires token
*/
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/*  Get One Project DONE
    - send id
    - returns project with matching id
*/
router.get('/:id', getProject, async (req, res) => {
    Project.findOne({ _id: res.project._id })
        .exec(function (err, u) {
            if (err) return handleError(err);
            res.project = u
            res.json(res.project)
        })
})

/* Create One Project DONE
    - send project and password
    - returns success or error response
*/
router.post('/', async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            stages: req.body.stages,
            sprint_length: req.body.sprint_length,
            sprint_start_day: req.body.sprint_start_day,
            team: req.body.team,
            description: req.body.description ? req.body.description : "",
            sprints: req.body.sprints ? req.body.sprints : [],
            tasks: req.body.tasks ? req.body.tasks : []
        })
        const newproject = await project.save()

        const team = await Team.findById(req.body.team)
        if(team) {
            team.projects.push(newproject)
            team.save()
        }
        res.status(201).json(newproject)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/*  Update One Project DONE
    - send project data
    - returns success or error response
*/
router.put('/:id', getProject, async (req, res) => {
    try {
        res.project = _.extend(res.project, req.body);
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

/* Delete One Project
    - send id
    - returns success or error response
*/
router.delete('/:id', getProject, async (req, res) => {
    try {
        await res.project.remove()
        res.json({ message: 'Deleted This Project' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

/*  Delete all projects DONE
    - send nothing
    - return success or error response
*/
router.delete('/', async (req, res) => {
    try {
        await Project.deleteMany()
        res.json({ message: 'Deleted All Projects' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Reusable function thats gets a single project, helpful for GET by id, UPDATE, DELETE
async function getProject(req, res, next) {
    try {
      project = await Project.findById(req.params.id)
      if (project == null) {
        return res.status(404).json({ message: 'Cant find project'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.project = project
    next() // move onto the next section of code (the rest of the specific route method logic)
  }
module.exports = router
