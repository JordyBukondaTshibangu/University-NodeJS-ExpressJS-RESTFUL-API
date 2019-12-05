const express = require('express')
const router = express.Router()
const Course = require('../models/courses')
const Lecturer = require('../models/courses')
const auth_Lecturer = require('../middleware/auth-lecturer')


router.post('/courses/', auth_Lecturer, async (req, res) =>{
   try {
        const course = new Course(req.body) 
        const savedCourse = await course.save()
        res.send(savedCourse)
    }catch(err){
        res.send(err)
    }
})
router.get('/courses/',async (req, res) => {
    try{
        const courses = await Course.find()
        res.send(courses)
    }catch(err){
        res.send(err)
    }
})
router.patch('/courses/:id', auth_Lecturer,  async (req, res) => {
try{
    const update = await Course.findByIdAndUpdate({_id : req.params.id}, req.body)
     res.send(update)
}catch(err){
    res.send(err)}
})
router.delete('/courses/:id', auth_Lecturer, async(req, res) => {
    try{
        const deleted = await Course.findByIdAndDelete({_id : req.params.id})
        res.send(deleted)
    }catch(err){
        res.send(err)}
})
router.get('/courses/:id', async(req, res) => {
    try{
        const course = await Course.findById({_id : req.params.id})
        res.send(course)
    }catch(err){
        res.send(err)}
})
module.exports = router