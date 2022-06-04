const mongoose = require('mongoose')
const User = new mongoose.Schema({
    role: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    falcuty: {
        type: String
    },
    name: {
        type: String
    },
    class: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://cdn.trendhunterstatic.com/thumbs/human-facebook-default-avatar.jpeg'
    },
})
const Users = mongoose.model('User',User)
module.exports = Users