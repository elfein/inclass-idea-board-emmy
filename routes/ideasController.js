const router = require('express').Router({ mergeParams: true })
// remember to bring in both User and Idea, or like, both your models you're working with
const { User, Idea } = require('../db/model')

// create
// hw - this takes a number of steps in order to create a new "default" idea, 
// add it to the user's idea array, save it, and expose the updated data...
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
// we use if statements her to determine if the updated data being passed applied to certain keys before actually changing them. 
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
            // hw - basically, pull will find something to delete I think by finding the item in a provided array that satisfies a query,
            // but that info is passed as an object with the array as the key and the query as an object value of that key...
            return user.update({ $pull: { ideas: { _id: req.params.id } } })
            // do the one above this line, don't worry about: 
            // users.ideas.filter(idea => ) etc
        })
        .then(user => {
            res.send(user)
        })
})

module.exports = router