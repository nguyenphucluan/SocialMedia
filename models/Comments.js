const mongoose = require('mongoose')
const Comment = new mongoose.Schema({
    comment: {
        type: String
    },
    createAt: {
        type: Date,
        default: new Date().getTime()
    },
    author: {
        type: String
    },
    postid: {
        type: String
    }
})
const Comments = mongoose.model('Comment',Comment)
module.exports = Comments