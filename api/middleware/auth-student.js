import  jwt from 'jsonwebtoken';
import  Student from '../models/students.js';

export const auth_Student = async (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, "process.env.JWT_KEY")
        const student = await Student.findOne({_id : decoded.studentId, email : decoded.email})
        
        if(!student){
            throw new Error('Auth Failed')
        }
        req.student = student
        req.studentToken = token
        next()

    } catch(err){
        res.send(err)
    }
}