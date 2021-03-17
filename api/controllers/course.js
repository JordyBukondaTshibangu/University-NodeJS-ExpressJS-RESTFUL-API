import  Course from '../models/courses.js';


export const create_course = async (req, res) =>{
    try {
        const course = new Course(req.body) 
        const createdCourse = await course.save()
        res.status(202).json({
            message : "Course Created ",
            course : createdCourse
        })
    } catch(err){
        res.status(500).json({
            message : err.message
        })
        }
}
export const getAll_course = async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json({
            "Lists of courses " : courses
        })
    } catch(err){
        res.status(500).json({
                message : err.message
        })
    }
}
export const get_course = async(req, res) => {
    try{
        const _id = req.params.id
        const course = await Course.findById({_id})
        res.status(200).json({course})
    } catch(err){
        res.status(500).json({
                message : err.message
            })}
}
export const update_course = async (req, res) => {
    try {

        const _id = req.params.id
        const update = req.body
        const updated = await Course.findByIdAndUpdate({_id}, update)
        res.status(200).json({updated})

    }catch(err){
        res.status(500).json({
                message : err.message
        })}
}
export const delete_course = async(req, res) => {
    try {
        const _id = req.params.id
        const deletedCourse = await Course.findByIdAndDelete({_id})
        res.status(200).json({
            message : "Course sucessfully deleted",
            course : deletedCourse
        })
    }catch(err){
        res.status(500).json({
                message : err.message
        })}
}