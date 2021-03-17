import jwt from 'jsonwebtoken';
import Lecturer from '../models/lectures.js';

export const auth_Lecturer = async (req, res, next) =>{

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token,"process.env.JWT_KEY")
        const lecture = await Lecturer.findOne({_id : decoded.lectureId, email : decoded.email})

        if(!lecture){
            throw new Error('Please create an account !!!')
        }
        
        req.lecture = lecture
        req.tokenLecture = token
        next()

    }catch(err)
    {
        res.status(500).json({message : 'Authentication failed'})
    }   
}

