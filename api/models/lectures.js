import  mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const Schema = mongoose.Schema

const lectureSchema = new Schema({
    fullName : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
        max : [120, 'Are you sure you are older than 120 '],
        min : [10, 'I am pretty sure you are older than 10, right ? ']
    },
    email : {
        type : String,
        trim : true,
        validate(value){
            if(validator.isEmail(value) !== true){
                throw new Error('Please enter a valid email address')
            }
        },
        unique : true
    },
    DOB : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(value.length <= 6){
                throw new Error('Password too short')
            }
        }
    },
    picture :{
        type : String
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

lectureSchema.virtual('course', {
    ref : 'Course',
    localField : '_id',
    foreignField : 'lectures'
})

lectureSchema.methods.generateToken = async function(){
    lecture = this 

    const token = jwt.sign({
        _id : lecture._id, 
        email : lecture.email
    },'PRIVATE_KEY',
    {
         expiresIn : '2h'
    })
    lecture.tokens = lecture.tokens.concat({token})
    await lecture.save()

    return token
}

const lectureExport = mongoose.model('Lecture', lectureSchema);

export default lectureExport