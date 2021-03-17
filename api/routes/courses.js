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


router.post('/', auth_Lecturer, create_course)
router.get('/', getAll_course)
router.get('/:id', get_course)
router.put('/:id', auth_Lecturer, update_course)
router.delete('/:id', auth_Lecturer, delete_course)


export default router