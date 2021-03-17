import  Course from '../models/courses.js';


export const create_course = async (req, res) =>{
    try {
            const course = new Course(req.body) 
            const savedCourse = await course.save()
            res.send(savedCourse)
        }catch(err){
            res.send(err)
        }
}
export const update_course = async (req, res) => {
    try{
        const update = await Course.findByIdAndUpdate({_id : req.params.id}, req.body)
         res.send(update)
    }catch(err){
        res.send(err)}
}
export const getAll_course = async (req, res) => {
    try{
        const courses = await Course.find()
        res.send(courses)
    }catch(err){
        res.send(err)
    }
}
export const get_course = async(req, res) => {
    try{
        const course = await Course.findById({_id : req.params.id})
        res.send(course)
    }catch(err){
        res.send(err)}
}
export const delete_course = async(req, res) => {
    try{
        const deleted = await Course.findByIdAndDelete({_id : req.params.id})
        res.send(deleted)
    }catch(err){
        res.send(err)}
}