const express = require('express')
const bodyParser = require('body-parser')
require('./api/db/mongoose')
const LectureRouter = require('./api/routes/lecturers')
const StudentRouter = require('./api/routes/students')
const CourseRouter = require('./api/routes/courses')
const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))
app.use(LectureRouter)
app.use(StudentRouter)
app.use(CourseRouter)

app.listen(port, () => {
    console.log(` The server is up running on port : ${port}`)
})