const mongoose = require('mongoose')
const Announcement = new mongoose.Schema({
    announcement: {
        type: String
    },
    createAt: {
        type: Date,
        default: new Date().getTime()
    },
    falcuty: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    }
})
const Announcements = mongoose.model('Announcement',Announcement)
module.exports = Announcements