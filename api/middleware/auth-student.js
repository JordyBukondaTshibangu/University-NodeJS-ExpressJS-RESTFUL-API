import  jwt from 'jsonwebtoken';
import  Student from '../models/students.js';

export const auth_Student = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = await jwt.verify(token,'PRIVATE_KEY')
        const student = await Student.findOne({_id : decoded.id, email : decoded.email})
        
        if(!student){
            throw new Error('Auth Failed')
        }
        req.student = student
        req.token = token
        next()

    }catch(err){
        res.send(err)
    }
}