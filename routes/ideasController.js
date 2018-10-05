const router = require('express').Router({ mergeParams: true })
// remember to bring in both User and Idea, or like, both your models
const { User, Idea } = require('../db/model')

// create
router.post('/', (req, res) => {
    const newIdea = new Idea()
    User.findById(req.params.userId)
        .then((user) => {
            user.ideas.push(newIdea)
            return user.save()
        })
        .then((user) => {
            res.send(user)
        })
})

// update
router.put('/:id', (req,res) => {
    User.findById(req.params.userId)
    .then(user => {
        const idea = user.ideas.id(req.params.id)
        const updatedIdea = req.body

        if (updatedIdea.title) {
            idea.title = updatedIdea.title
        }

        if (updatedIdea.description) {
            idea.description = updatedIdea.description
        }
        return user.save()
    })
    .then(user => {
        res.send(user)
    })
})

// delete
router.delete('/:id', (req, res) => {
    User.findById(req.params.userId)
        .then((user) => {
            //there's some crazy mongo query stuff happening
            return user.update({ $pull: { ideas: { _id: req.params.id } } })
            // do the one above this line, don't worry about: 
            // users.ideas.filter(idea => )
        })
        .then(user => {
            res.send(user)
        })
})

module.exports = router