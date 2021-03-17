import mongoose from 'mongoose';

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
    department : {
        type : String,
        required : true
    }
})

const courseExport  = mongoose.model('Course', courseSchema);

export default courseExport;