
import  sharp from 'sharp';
import  bcrypt from 'bcrypt';
import Student from '../models/students.js';
import { WelcomeStudent, sendCancelEmail } from '../email/studentEmail.js';

export const create_student = async(req, res) =>{
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
}
export const upload_profilPic_student = async  (req, res) => {

    const resizedPicture = await sharp(req.file.buffer).resize({ width : 200, height : 200}).png().toBuffer()
    req.student.picture = resizedPicture
    const student = await req.student.save()
    res.send('Image Uploaded successfully ')
}
export const get_student_profile = async(req, res) =>{
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
}
export const login_student = async (req,res) => {
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
}
export const get_me = async(req, res) => {
    try{
        res.send(req.student)
    }catch(err){
        res.send(err)
    }
}
export const update_me = async(req, res) => {
    try{
        const result = await Student.findByIdAndUpdate({_id : req.student._id}, req.body)
        res.send(result)
    }catch(err){
        res.send(err)
    }
}
export const delete_me = async(req, res) => {
    try{
        await Student.findOneAndDelete(req.student.id)
        res.send('User deleted')
        await sendCancelEmail()
    }catch(err){
        res.send(err)
    }
}
export const get_All_students = async(req, res) => { 
    try{
        const students = await Student.find()
        res.send(students)
    }catch(err){
        res.send(err)
    }  
}


export const update_student = async(req, res) => {
    try{
        const update = await Student.findByIdAndUpdate({_id : req.params.id}, req.body)
        res.send(update)
    }catch(err){
        res.send(err)
    }
}
export const delete_student = async(req, res) => {
    try{
        const deleted = await Student.findByIdAndDelete({_id : req.params.id})
        res.send(deleted)
        await sendCancelEmail()
    }catch(err){
        res.send(err)
    }
}
export const get_student = async(req, res) => {
    try{
        const student = await Student.findById({_id : req.params.id})
        res.send(student)
    }catch(err){
        res.send(err)
    }
}