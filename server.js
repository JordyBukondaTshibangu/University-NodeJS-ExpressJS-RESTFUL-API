import  express from 'express';
import  bodyParser from 'body-parser';
import './api/db/mongoose.js';
import LectureRouter from './api/routes/lecturers.js';
import StudentRouter from './api/routes/students.js';
import CourseRouter from './api/routes/courses.js';
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.use('/lectures', LectureRouter)
app.use('/students', StudentRouter)
app.use('/courses', CourseRouter)

app.listen(port, () => {
    console.log(` The server is up running on port : ${port}`)
})
