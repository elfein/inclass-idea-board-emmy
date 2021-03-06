// IMPORTING DEPENDENCIES
require('dotenv').config()
// ^^^1. always remember this env setup!!!!!
// BE VERY CAREFUL
// 1b. MAKE A GIT REPO
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// CONNECT TO DB
// 2. brought in mongoose, 2b connected mongoose, 2c added path in env file
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

// 3. we put in these console.logs...
const connection = mongoose.connection
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully')
});
// If the connection throws an error
connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err)
})

// 4. we deleted router things... we tested with npm start
//5. then we create-react-app client In the terminal
// 6. the we installed concurrently
// 7. then we added a script to the package.json
// 8. then we changed lined 15 of the www .bin file
// 9. i think we're about to deploy to heroku and test... so first we did npm run build in the client folder
// 10. ? ... we pasted some lines into the idea board package json. engines? things?
// 11. IN THE IDEA BOARD TERMINAL DO HEROKU STUFF

// EXPRESS AND MIDDLEWARE
var app = express()


// 16. we also took out unecessary files like the link to public directory, the directory itself, and index and user.js files in routes
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + '/client/build/'))

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

// 13. bring in controller
const usersController = require('./routes/usersController')
const ideasController = require('./routes/ideasController')

// 12. where our data will be...
app.use('/api/users', usersController)
app.use('/api/users/:userId/ideas', ideasController)

module.exports = app
