// 13a make this file
const router = require('express').Router()
// 14? make this data part
const { User } = require('../db/model')

// Show All
//  HOW TO DO AN AWAIT ASYNC FUNCTION WITH CALLBACK FUNCTION?
router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

{/* The .then version of the same thing as above
    router.get('/', (req,res) => {
    User.find()
    .then((response) => {
    res.send(response)
    })
})*/}

// 17. We laid out the routes and cleared out the ones that are no longer
// necessary on the back end

// 18. then we did this route quickly, copying from the Show All route
// Show One
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user)
})


// 21. then this!! don't just copy paste
// Create
router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.send(user)
})

// 19. we did this next. make sure to change .get to .put
// 20. also we needed to add another parameter after req.body, that new:true part
// Update
router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.send(user)
})

// 21. then this!!! Can paste and modify from update.
// Delete
router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.sendStatus(200)
})

module.exports = router