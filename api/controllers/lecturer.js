
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { WelcomeLecturer, sendCancelEmail } from '../email/lecturerEamil.js';
import Lecturer from '../models/lectures.js';

export const create_lecturer =  async (req, res) => {
    try {
        const { fullName, age, email, DOB, description, password } = req.body

        await bcrypt.hash(password, 8, async( err, hash) => {
                const lecture = new Lecturer({
                    fullName, age, email, DOB, description,
                    password :hash
                }) 

                const savedLecture =  await lecture.save()   
                res.status(202).json({ lecture : savedLecture })
                WelcomeLecturer
        })
    } catch(err){
        res.status(500).json({ message : err.message })
    }
}
export const login_lecturer = async (req,res) => {
    try {
        const { email , password } = req.body
        const lecture = await  Lecturer.findOne({email})
                if(!lecture){
                    res.status(404).json({ message : 'Auth Faied'})
                }
                bcrypt.compare(password, lecture.password, (err, result) => {
                    if(err){
                        throw new Error('Auth Failed !!!');
                        return
                    }
                    if(result){
                        const token =  jwt.sign({
                            email : lecture.email ,
                            lectureId : lecture._id
                        },
                        "process.env.JWT_KEY",
                        {
                            expiresIn : '1h'
                        })
                        return res.status(200).json({
                            message : 'Authentication Successfull',
                            lecture,
                            token 
                        })
                    }
                })
    }catch(err){
        res.status(500).json({ message : err.message })
    }
}
export const getProfile_lecturer = async (req, res) => {
    try{
        const lecture = await Lecturer.findOne({email : req.lecture.email})
        res.send(lecture)
    }catch(err){
        res.send(err)
    }
}
export const update_lecturer = async (req, res) => {
    try {
          const _id = req.params.id  
          const update = req.body
          const updated = await Lecturer.findOneAndUpdate({_id }, update)
              res.status(200).json({
                  message : "Lecture successfully updated",
                  new : update,
                  old : updated
              })
    } catch(err){
        res.status(500).json({ message : err.message })
    }
}
export const delete_lecturer = async (req, res) => {
    try{

        const _id = req.params.id
        const deleted = await Lecturer.findOneAndDelete({_id})
        await sendCancelEmail(req.lecture.email, req.lecture.fullName)
        res.status(200).json({message : "Profile successfully deleted", lecture : deleted})

    }catch(err){
        res.status(500).json({ message : err.message })
    }
}
export const getAll_lecturers = async (req, res) => {
    try {
        const lectures = await Lecturer.find().select('fullName email description' )
        res.status(200).json(lectures)
    } catch(err){
        res.status(500).json({ message : err.message })
    }
}
export const getSingle_lecturer = async (req, res) => {
    try {
        const _id = req.params.id
        const lecture = await Lecturer.findById({_id}).select('fullName email description DOB')
        res.status(200).json(lecture)
    } catch(err){
        res.status(500).json({ message : err.message })
    }
    
}
