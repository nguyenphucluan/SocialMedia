const mongoose = require('mongoose')
const Newsfeed = new mongoose.Schema({
    newsfeed: {
        type: String
    },
    createAt: {
        type: Date,
        default: new Date().getTime()
    },
    author: {
        type: String
    }
})
const Newsfeeds = mongoose.model('Newsfeed',Newsfeed)
module.exports = Newsfeeds