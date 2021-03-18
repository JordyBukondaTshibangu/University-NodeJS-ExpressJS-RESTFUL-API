import  express from 'express';
import  multer from 'multer';
const router = express.Router()
import {
create_student,
login_student,
upload_profile,
get_me,
update_me,
get_All_students,
delete_student,
get_student
} from '../controllers/student.js'
import { auth_Lecturer } from '../middleware/auth-lecturer.js';
import { auth_Student } from '../middleware/auth-student.js';

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './studentsProfile/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
  const fileLimit = {
    limits : {
        fileSize : 1024 * 1024
    },
  }
  const fileFilter = (req, file, cb) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(undefined, true)
    }
    else {
        return cb(new Error('Please uplaod an image'))
    }
}

const upload = multer({
    storage,
    limits : fileLimit.limits,
    fileFilter
})


router.post('/login', login_student);
router.get('/me', auth_Student, get_me);
router.put('/me', auth_Student, update_me);
router.post('/me/profile', auth_Student, upload.single('studentPicture'), upload_profile)

router.get('/', auth_Lecturer, get_All_students);

router.post('/',auth_Lecturer, create_student)
router.delete('/:id',auth_Lecturer, delete_student);
router.get('/:id', auth_Lecturer, get_student);

export default router