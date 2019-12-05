const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    start:{
        type : String,
        required : true,
    },
    ends :{
        type : String,
        required : true
    },
    lecture : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Lecture'
    },
    students : {
        type : mongoose.Schema.Types.ObjectId,
       // required : true,
        ref : 'Student'
    },
    department : {
        type : String,
        required : true
    }
})

const course = module.exports = mongoose.model('Course', courseSchema)