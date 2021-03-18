import  express from 'express';
import multer from 'multer';
const   router = express.Router()
import {
create_course,
create_course_content,
getAll_course,
get_course,
update_course,
delete_course
} from '../controllers/course.js'
import  { auth_Lecturer } from '../middleware/auth-lecturer.js';

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './courses/content/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileLimit = {
    limits : {
        fileSize : Infinity
    },
}
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'text/plain' || file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        cb(undefined, true)
    }
    else {
        return cb(new Error('Please uplaod a file'))
    }
}

const upload = multer({
    storage,
    limits : fileLimit.limits,
    fileFilter
})

router.post('/', auth_Lecturer, create_course)
router.post('/:id/content', upload.single('content'), create_course_content)
router.get('/', getAll_course)
router.get('/:id', get_course)
router.put('/:id', auth_Lecturer, update_course)
router.delete('/:id', auth_Lecturer, delete_course)


export default router