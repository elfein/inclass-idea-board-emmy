// 13a make this file
const router = require('express').Router()
// 14? make this data part
const { User } = require('../db/model')

router.get('/', async (req,res) => {
    const response = await User.find()
    res.send(response)
})

module.exports = router