const mongoose = require('mongoose')
const { UserSchema, IdeaSchema } = require('./schema')

// bring in mongoose and schemas, then make them usable models? 
// question about why the first argument in model() is a string? is it something to do with mongoDB and the way it names collections?
const UserModel = mongoose.model('User', UserSchema)
const IdeaModel = mongoose.model('Idea', IdeaSchema)

module.exports = { User: UserModel, Idea: IdeaModel }