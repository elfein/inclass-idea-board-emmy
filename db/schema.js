const Schema = require('mongoose').Schema

// bring in mongoose, then create base/scaffolding for your data, or schemas...
// have option to make "default" data!!!!!!!!! cool!!

const IdeaSchema = new Schema({
    title: {
        type: String,
        default: 'New Idea'
    },
    description: {
        type: String,
        default: 'New Description'
    }
})

const UserSchema = new Schema({
    userName: String,
    password: String,
    ideas: [IdeaSchema]
})

// export export export
module.exports = { UserSchema, IdeaSchema }