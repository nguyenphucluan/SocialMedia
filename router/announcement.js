const express = require('express')
const passport = require('passport')
const router = express.Router()

const Newsfeeds = require('../models/Newsfeeds')
const Comments = require('../models/Comments')
const Users = require('../models/Users')
const Announcements = require('../models/Announcements')

router.get('/' , (req , res)=>{

    if(!req.session._id) {
        return res.redirect('/login')
    }
    let feeds = undefined
    let comments = undefined
    let Anno = undefined
    Comments.find()
    .then(data => {
        comments = data
        //console.log(data)
    })
    Newsfeeds.find()
    .then(data => {
        feeds = data
    })
    Announcements.find()
    .then(data => {
        Anno = data
    })
    Users.findOne({_id: req.session._id}, function (e, data) {
        //console.log(data)
        return res.render('news',{user: data, news: feeds, comments: comments, announcements: Anno})
    })
})
router.post('/delete/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   console.log(id)
   Announcements.deleteOne({_id: id})
   .then(data => {
       return res.send(data)
   })
})
router.post('/update/:id', (req, res) => {
    let {content,title,falcuty} = req.body
    let id = req.params.id
    Announcements.findByIdAndUpdate({_id: id}, {$set: {
        title: title,
        announcement: content,
        falcuty: falcuty
    }})
    .then(data => {
        return redirect('/announcements')
    })
})
router.get('/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let feeds = undefined
    let comments = undefined
    let anno = undefined
    Comments.find()
    .then(data => {
        comments = data
    })
    Newsfeeds.find()
    .then(data => {
        feeds = data
    })
    Announcements.findOne({_id: req.params.id})
    .then(data => {
        anno = data
    })
    Users.findOne({_id: req.session._id}, function (e, data) {
        return res.render('new-chitiet',{user: data, news: feeds, comments: comments, announcements: anno})
    })
})

module.exports = router