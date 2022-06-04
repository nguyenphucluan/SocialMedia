const express = require('express')
const passport = require('passport')
const router = express.Router()

const Users = require('../models/Users')

router.get('/', (req, res) => {
    return res.redirect('/login')
})

router.get('/login', (req, res) => {
    return res.render('dangnhap')
})
router.get('/logout', (req, res) => {
    req.session.destroy()
    return res.redirect('/login')
})
router.post('/login' , (req , res)=>{

    let {email, password} = req.body
    Users.findOne({email: email})
    .then(data => {
        if(!data) {
            return res.send('email khong co trong database')
        }
        //console.log(data)
        if(password == data.password) {
             req.session._id = data._id
             req.session.name = data.name
             req.session.role = data.role
             //console.log(data._id)
             //console.log(req.session._id)
             //return res.redirect('/newsfeed')
             return res.redirect('/newsfeed')
        }
        else {
             return res.send('Sai mat khau')
        }
    })
 
 })
router.post('/createAccount', (req, res) => {
    // if(!req.session._id) {
    //     return res.redirect('/login')
    // }
    let {email, password, name, falcuty} = req.body
    Users.findOne({email: email})
    .then(data => {
        if(data) {
            return res.send('Tai khoan ton tai')
        }
        let newAccount = new Users({
            email: email,
            password: password,
            name: name,
            falcuty: falcuty,
            role: 'falcuty'
        })
        return newAccount.save()
    })
    .then(() => {
        return res.redirect('/newsfeed')
        //return res.redirect('/newsfeed')
    })
})
router.post('/changePassword' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let {oldpassword, newpassword} = req.body
   Users.findOne({_id: req.session._id})
    .then(data => {
        if(oldpassword == data.password) {
            Users.findByIdAndUpdate({_id: req.session._id}, {$set: {
                password: newpassword
                }})
                .then(data => {
                    return res.redirect('/newsfeed')
                })
        }
        else {
             return res.json({code: 1, message: 'Sai mat khau'})
        }
    })
   

})

router.post('/UpdateAccount' , (req , res)=>{
    if(!req.session._id) {
        return res.redirect('/login')
    }
   let {name, lop, falcuty, avatar} = req.body
   Users.findByIdAndUpdate({_id: req.session._id}, {$set: {
       name: name,
       class: lop,
       falcuty: falcuty,
       avatar: avatar
   }})
   .then(data => {
       req.session.name = name
       return res.redirect('/newsfeed')
   })
})

module.exports = router