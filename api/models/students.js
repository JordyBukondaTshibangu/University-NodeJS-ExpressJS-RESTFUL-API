import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema

const studentSchema = new Schema({
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
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }],
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
    picture : {
        type : Buffer
    }
}, 
    {
       timeStamps : true 
    }    
)
const studentExport = mongoose.model('Student', studentSchema);

export default studentExport;
