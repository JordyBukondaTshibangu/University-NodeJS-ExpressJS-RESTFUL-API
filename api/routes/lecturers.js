const express = require('express')
const bcrypt = require('bcrypt')
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router()
const Lecturer = require('../models/lectures')
const auth_Lecturer = require('../middleware/auth-lecturer')
const {WelcomeLecturer,sendCancelEmail} = require('../email/lecturerEamil')

const uplaod = multer({
    limits : {
        fileSize : 1024 * 1024
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.jpg')){
            return cb(new Error('Please uplaod an image'))
        }
        else{
            cb(undefined, true)
        }
    }
})
router.post('/lectures/profil', auth_Lecturer, uplaod.single('picture'),async(req, res) => {

    const resizedPic = await sharp(req.file.buffer).resize({width : 200, height : 200}).png().toBuffer()
    req.lecture.picture = resizedPic
    await req.lecture.save()
    res.send('Image Successfully uploaded')
}, (err, req, res, next) => {
    res.send('Error')
})
router.get('/lectures/:id/profil', async(req, res) => {
    try{
        const lecture = await Lecturer.findById(req.params.id)
        if(!lecture || !lecture.picture){
            throw new Error('No Lecture found !!!')
        }

        res.set('Content-Type', 'image/jpeg')
        res.send(lecture.picture)
    }catch(err){
        res.send(err)
    }
})
router.post('/lectures/', async (req, res) =>{
   try{
        await bcrypt.hash(req.body.password, 8, async(err, hash) =>{
        const lecture = new Lecturer({
            fullName : req.body.fullName,
            age : req.body.age,
            email : req.body.email,
            DOB : req.body.DOB,
            description : req.body.description,
            password :hash
    }) 
        const savedLecture =  await lecture.save()    
        const token = await lecture.generateToken()
        await WelcomeLecturer(req.lecture.email, req.lecture.fullName)
        res.send({savedLecture, token})
    })
   }catch(err){
       res.send(err)
   }
})
router.post('/lectures/login', async (req,res) => {
    try{
       const lecture = await  Lecturer.findOne({email : req.body.email})
            if(!lecture){
                res.send('Auth Faied')
            }
            bcrypt.compare(req.body.password, lecture.password, (err, result) =>{
                if(err){
                    throw new Error('Auth Failed !!!')
                }
                if(result){
                    const token = lecture.generateToken()
                    console.log(token)
                    return res.send({lecture, token})
                }
            })
    }catch(err){
        res.send(err)
    }
})
router.get('/lectures/me',auth_Lecturer, async (req, res) => {
    try{
        const lecture = await Lecturer.findOne({email : req.lecture.email})
        res.send(lecture)
    }catch(err){
        res.send(err)
    }
})
router.get('/lectures', async (req, res) => {
    try{
        const lectures = await Lecturer.find()
        res.send(lectures)
    }catch(err){
        res.send(err)
    }
})
router.patch('/lectures/me', auth_Lecturer,async (req, res) => {
  try{
        const update = req.body
        const updated = await Lecturer.findOneAndUpdate(update)
            res.send(updated)
  }catch(err){
      res.send(err)
  }
})
router.delete('/lectures/me', auth_Lecturer, async (req, res) => {
    try{
        const deleted = await Lecturer.findOneAndDelete()
        await sendCancelEmail(req.lecture.email, req.lecture.fullName)
        res.send(deleted)
    }catch(err){
        res.send(err)
    }
})
router.get('/lectures/:id', async (req, res) => {
    try{
        const id = req.params.id
            const lecture = await Lecturer.findById({_id : id})
            res.send(lecture)
    }catch(err){
        res.send(err)
    }
    
})
module.exports = router