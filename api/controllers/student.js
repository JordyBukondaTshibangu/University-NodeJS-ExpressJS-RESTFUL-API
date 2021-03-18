import  sharp from 'sharp';
import  bcrypt from 'bcrypt';
import Student from '../models/students.js';
import { WelcomeStudent, sendCancelEmail } from '../email/studentEmail.js';
import jwt from 'jsonwebtoken';

export const create_student = async(req, res) => {
    try {
        const { fullName, age, email, DOB, description, password } = req.body

        await bcrypt.hash(password, 8, async(err, hash) =>{
                
            const student = new Student({
                    fullName, age, email, DOB, description,
                    password : hash
            }) 
            const studentCreated = await student.save()
            await WelcomeStudent(email, fullName)
            res.status(202).json({
                message : "Student successfully created ",
                student : studentCreated
            })
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const delete_student = async(req, res) => {
    try {
        const _id = req.params.id
        const deletedStudent = await Student.findByIdAndDelete({_id})
        res.status(200).json({
            message : "Student successfully deleted",
            deletedStudent
        })

        await sendCancelEmail(deletedStudent.email, deletedStudent.fullName)

    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const get_student = async(req, res) => {
    try {

        const _id = req.params.id
        const student = await Student.findById({_id}).select('fullName age DOB email description')
        res.status(200).json({student})

    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const get_All_students = async(req, res) => { 
    try {
        
        const students = await Student.find().select('fullName age DOB email description')
        res.status(200).json({ 
            message : "List of students",
            List : students
        })
    } catch(err){
        res.status(500).json({
            message : err.message
        })
    }  
}

export const login_student = async (req,res) => {
    try {
        const { email, password } = req.body
        const student = await Student.findOne({email})
        if(!student){
            throw new Error('No student found !!!')
        }
        if(student){
            await bcrypt.compare(password, student.password, (error, result) => {
                if(error){
                    throw new Error('Auth failed')
                }
                if(result){
                    const token =  jwt.sign({
                        email : student.email ,
                        studentId : student._id
                    },
                    "process.env.JWT_KEY",
                    {
                        expiresIn : '1h'
                    })
                    return res.status(200).json({
                        message : 'Authentication Successfull',
                        student,
                        token 
                    })
                }
            })
            
        }
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const get_me = async(req, res) => {
    try {
        res.status(200).json({student : req.student})
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const update_me = async(req, res) => {
    try {

        const _id = req.body.id;
        const update = req.body

        console.log(_id, update)

        const student = await Student.findByIdAndUpdate({_id}, update)
        res.status(200).json({
            message : "Profile updated",
            student
        })

    } catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
export const upload_profile = async(req, res) => {
    try {
        const { path } = req.file
        const studentPicture = path
        const _id = req.student.id;

        const student = await Student.findByIdAndUpdate({_id}, { studentPicture });
        res.status(200).json({
            message : "Profile updated",
            studentPicture : student.studentPicture
        })
    } catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

