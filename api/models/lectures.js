import  mongoose from 'mongoose';
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
    }
})

const lectureExport = mongoose.model('Lecture', lectureSchema);

export default lectureExport