import  express from 'express';
import  multer from 'multer';
const router = express.Router()
import {
create_student,
login_student,
get_me,
update_me,
get_All_students,
delete_student,
get_student
} from '../controllers/student.js'
import { auth_Lecturer } from '../middleware/auth-lecturer.js';
import { auth_Student } from '../middleware/auth-student.js';

/*
const upload = multer({
    limits : {
        fileSize : 1024 * 1024
    },
    fileFilter (req, file, cb){
        if(!file.originalname.endsWith('.jpg')){    
            return cb(new Error('Please uplaod an Image'))
        }
        else{
            cb(undefined, true)
        }
    }
})

const resizedPicture = await sharp(req.file.buffer).resize({ width : 200, height : 200}).png().toBuffer()
    req.student.picture = resizedPicture
    const student = await req.student.save()
    res.send('Image Uploaded successfully ')
*/


router.post('/login', login_student);
router.get('/me', auth_Student, get_me);
router.put('/me', auth_Student, update_me);

router.get('/', auth_Lecturer, get_All_students);

router.post('/',auth_Lecturer, create_student)
router.delete('/:id',auth_Lecturer, delete_student);
router.get('/:id', auth_Lecturer, get_student);

export default router