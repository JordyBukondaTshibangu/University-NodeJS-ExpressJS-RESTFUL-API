import jwt from 'jsonwebtoken';
import Lecturer from '../models/lectures.js';

export const auth_Lecturer = async (req, res, next) =>{

    try{
        const token = req.header('AUTHORIZATION').replace('Bearer ', '')
        const decoded = await jwt.verify(token,'PRIVATE_KEY')
        const lecture = await Lecturer.findOne({_id : decoded._id, email : decoded.email, 'tokens.token':token})
        if(!lecture){
            throw new Error('Please create an account !!!')
        }

        req.lecture = lecture
        req.token = token
        next()

    }catch(err)
    {
        res.send(err.message)
    }   
}

