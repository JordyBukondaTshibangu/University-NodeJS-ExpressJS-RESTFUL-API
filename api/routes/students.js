const express = require('express')
const bcrypt = require('bcrypt')
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router()
const Student = require('../models/students')
const auth_Lecturer = require('../middleware/auth-lecturer')
const auth_Student = require('../middleware/auth-student')
const {WelcomeStudent,sendCancelEmail} = require('../email/studentEmail')

const upload = multer({
    limits : {
        fileSize : 1024 * 1024
    },
    fileFilter (req, file, cb){
        if(!file.originalname.endsWith('.jpg')){    
            return cb(new Error('Please uplaod an Image'))
        }
        else{
            cb(undefined, true)
        }
    }
})

router.post('/students/',auth_Lecturer, async(req, res) =>{
    try{
        await bcrypt.hash(req.body.password, 8, async(err, hash) =>{
                
            const student = new Student({
                    fullName : req.body.fullName,
                    age : req.body.age,
                    email : req.body.email,
                    DOB : req.body.DOB,
                    description : req.body.description,
                    password : hash
            }) 
            const students = await student.save()
            await WelcomeStudent()
            res.send(students)
        })
    }catch(err){
        res.send(err)
    }
})
router.post('/students/profilPic',auth_Student,  upload.single('picture'), async  (req, res) => {

    const resizedPicture = await sharp(req.file.buffer).resize({ width : 200, height : 200}).png().toBuffer()
    req.student.picture = resizedPicture
    const student = await req.student.save()
    res.send('Image Uploaded successfully ')
}, (err, req, res, next) => {
    res.send(err.message)
})
router.get('/students/:id/profil', async(req, res) =>{
    try{
        const student = await Student.findById({_id : req.params.id})
        if(!student || !student.picture){
            throw new Error(' No sutudent')
        }
        console.log(student.picture)
        res.set('Content-Type','image/jpeg')
        res.send(student.picture)

    }catch(err){
        res.send(err)
    }
})
router.post('/students/login',async (req,res) => {
    try{
        const student = await Student.findOne({email :req.body.email})
        if(!student){
            throw new Error('NO student found !!!')
        }
        if(student){
            await bcrypt.compare(req.body.password, student.password)
            const token = await student.generateToken()
            console.log(token)
            res.send({ student, token})
        }
    }catch(err){
        res.send(err)
    }
})
router.get('/students/me', auth_Student,async(req, res) => {
    try{
        res.send(req.student)
    }catch(err){
        res.send(err)
    }
})
router.patch('/students/me', auth_Student, async(req, res) => {
    try{
        const result = await Student.findByIdAndUpdate({_id : req.student._id}, req.body)
        res.send(result)
    }catch(err){
        res.send(err)
    }
})
router.delete('/students/me',auth_Student, async(req, res) => {
    try{
        await Student.findOneAndDelete(req.student.id)
        res.send('User deleted')
        await sendCancelEmail()
    }catch(err){
        res.send(err)
    }
})
router.get('/students/',async(req, res) => { 
    try{
        const students = await Student.find()
        res.send(students)
    }catch(err){
        res.send(err)
    }  
})
router.patch('/students/:id',auth_Lecturer,async(req, res) => {
    try{
        const update = await Student.findByIdAndUpdate({_id : req.params.id}, req.body)
        res.send(update)
    }catch(err){
        res.send(err)
    }
})
router.delete('/students/:id',auth_Lecturer, async(req, res) => {
    try{
        const deleted = await Student.findByIdAndDelete({_id : req.params.id})
        res.send(deleted)
        await sendCancelEmail()
    }catch(err){
        res.send(err)
    }
})
router.get('/students/:id', auth_Lecturer, async(req, res) => {
    try{
        const student = await Student.findById({_id : req.params.id})
        res.send(student)
    }catch(err){
        res.send(err)
    }
})
module.exports = router