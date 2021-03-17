import  express from 'express';
const   router = express.Router()
import {
create_course,
getAll_course,
get_course,
update_course,
delete_course
} from '../controllers/course.js'
import  { auth_Lecturer } from '../middleware/auth-lecturer.js';


router.post('/courses/', auth_Lecturer, create_course)
router.get('/courses/', getAll_course)
router.patch('/courses/:id', auth_Lecturer, update_course)
router.delete('/courses/:id', auth_Lecturer, delete_course)
router.get('/courses/:id', get_course)

export default router