
import bcrypt from 'bcrypt';
import { WelcomeLecturer, sendCancelEmail } from '../email/lecturerEamil.js';
import Lecturer from '../models/lectures.js';
import sharp from 'sharp';

export const create_lecturer =  async (req, res) => {
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
 }
 export const login_lecturer = async (req,res) => {
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
}
export const uploadProfile_lecturer = async(req, res) => {

    try {
        const resizedPic = await sharp(req.file.buffer).resize({width : 200, height : 200}).png().toBuffer()
        req.lecture.picture = resizedPic
        await req.lecture.save()
        res.send('Image Successfully uploaded')
    }catch(err){
        (err, req, res, next) => {
            res.send('Error')}
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
    try{
          const update = req.body
          const updated = await Lecturer.findOneAndUpdate(update)
              res.send(updated)
    }catch(err){
        res.send(err)
    }
}
export const delete_lecturer = async (req, res) => {
    try{
        const deleted = await Lecturer.findOneAndDelete()
        await sendCancelEmail(req.lecture.email, req.lecture.fullName)
        res.send(deleted)
    }catch(err){
        res.send(err)
    }
}
export const getAll_lecturers = async (req, res) => {
    try{
        const lectures = await Lecturer.find()
        res.send(lectures)
    }catch(err){
        res.send(err)
    }
}
export const getSingle_lecturer = async (req, res) => {
    try{
        const id = req.params.id
            const lecture = await Lecturer.findById({_id : id})
            res.send(lecture)
    }catch(err){
        res.send(err)
    }
    
}
