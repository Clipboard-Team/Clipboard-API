// require express and schema dependencies
const express = require('express')
const router = express.Router()
var _ = require('underscore');
const Team = require('../models/team')
const User = require('../models/user')

/*  Get All Teams
    - send nothing
    - returns list of all teams
    - requires token
*/
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find()
        res.json(teams)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/*  Get One Team DONE
    - send id
    - returns team with matching id
*/
router.get('/:id', getTeam, async (req, res) => {
    Team.findOne({ _id: res.team._id })
        .exec(function (err, u) {
            if (err) return handleError(err);
            res.team = u
            res.json(res.team)
        })
})

/* Create One Team DONE
    - send team and password
    - returns success or error response
*/
router.post('/', async (req, res) => {
    try {
        const team = new Team({
            title: req.body.title,
            members: req.body.members,
            description: req.body.description ? req.body.description : "",
            projects: req.body.projects ? req.body.projects : [],
            roles: req.body.roles ? req.body.roles : []
        })

        const newteam = await team.save()

        for(let i = 0; i < req.body.members?.length; i++) {
            const user = await User.findById(req.body.members[i])
            if(user) {
                user.teams.push(newteam)
                user.save()
            }
        }
        res.status(201).json(newteam)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/*  Update One Team DONE
    - send team data
    - returns success or error response
*/
router.put('/:id', getTeam, async (req, res) => {
    try {
        res.team = _.extend(res.team, req.body);
        const updatedTeam = await res.team.save()
        res.json(updatedTeam)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

/* Delete One Team
    - send id
    - returns success or error response
*/
router.delete('/:id', getTeam, async (req, res) => {
    try {
        await res.team.remove()
        res.json({ message: 'Deleted This Team' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

/*  Delete all teams DONE
    - send nothing
    - return success or error response
*/
router.delete('/', async (req, res) => {
    try {
        await Team.deleteMany()
        res.json({ message: 'Deleted All Teams' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

// Reusable function thats gets a single team, helpful for GET by id, UPDATE, DELETE
async function getTeam(req, res, next) {
    try {
      team = await Team.findById(req.params.id)
      if (team == null) {
        return res.status(404).json({ message: 'Cant find team'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.team = team
    next() // move onto the next section of code (the rest of the specific route method logic)
  }
module.exports = router
