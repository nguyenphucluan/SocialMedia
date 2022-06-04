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
    let posts = undefined
    let anno = undefined
    Newsfeeds.find()
    .then(data => {
        posts = data
    })
    Announcements.find()
    .then(data => {
        anno = data
    })
    Users.findOne({_id: req.session._id}, function (e, data) {
        //console.log(data)
        Comments.find()
        .then(binhluan => {
            return res.render('newsfeed',{user: data, news: posts, comments: binhluan, announcements: anno})
        })
        
    })
})
router.get('/:user', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let posts = undefined
    let comments = undefined
    let anno = undefined
    //console.log(req.params.ten)
    Comments.find()
    .then(data => {
        comments = data
        //console.log(data)
    })
    Newsfeeds.find()
    .then(data => {
        posts = data
    })
    Announcements.find()
    .then(data => {
        anno = data
    })
    Users.findOne({_id: req.session._id}, function (e, data) {
        //console.log(data)
        return res.render('userpage',{user: data, news: posts, comments: comments, announcements: anno, userpage: req.params.user})
    })
})
router.post('/writeFeed' , (req , res)=>{
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    let content = req.body.content
    let user = undefined
    Users.findOne({_id: req.session._id}, function(e, data) {
        let baivietmoi = new Newsfeeds({
            newsfeed: content,
            author: req.session.name
        })
        baivietmoi.save()
    })
    .then(data => {
        return res.redirect('/newsfeed')
    })
})
//Xong
router.post('/deleteFeed/:id' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   Newsfeeds.findByIdAndDelete({_id: id})
   .then(data => {
       return res.send('OK')
   })

})
//Chua Xong
router.post('/updateFeed/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let id = req.params.id
   let content = req.body.content
   console.log(content)
   Newsfeeds.findByIdAndUpdate({_id: id}, {$set: {newsfeed: content}})
   .then(data => {
       console.log(data)
       return res.redirect('/newsfeed')
   })
})
//------------------------------------------------DONE-------------------------------------------------
router.post('/commitComment', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let {comment, feedid} = req.body
    if(!comment || !feedid) {
        return res.redirect('/newsfeed')
    }
    console.log(req.body)
    let temp = new Comments({
        comment: comment,
        author: req.session.name,
        postid: feedid
    })
    console.log(temp)
    temp.save()
    return res.json({code: 0, message: 'OK', data: temp})
})
//Xong
router.post('/comment/delete/:id', (req, res) => {
    if(!req.session._id) {
        return res.redirect('/login')
    }
    let id = req.params.id
    Comments.deleteOne({_id: id})
    .then(data => {
        return res.send(data)
    })
})
router.post('/createAnnouncement' , (req , res)=>{
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    let {announcement,falcuty,title} = req. body
    console.log(req.body)
    if(!announcement || !falcuty || !title) {
        return res.redirect('/newsfeed')
    }
    console.log(req.body)
     let newone = new Announcements({
         title: title,
         announcement: announcement,
         author: req.session.name,
         falcuty: falcuty
     })
     newone.save()
     return res.redirect('/newsfeed')
 })

module.exports = router