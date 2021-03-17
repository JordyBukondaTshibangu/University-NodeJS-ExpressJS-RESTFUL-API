import  express from 'express';
import  multer from 'multer';
const router = express.Router()
import {
    create_student,
    upload_profilPic_student,
    get_student_profile,
    login_student,
    get_me,
    update_me,
    delete_me,
    get_All_students,
    update_student,
    delete_student,
    get_student
} from '../controllers/student.js'
import { auth_Lecturer } from '../middleware/auth-lecturer.js';
import { auth_Student } from '../middleware/auth-student.js';

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

router.post('/students/',auth_Lecturer, create_student)
router.post('/students/profilPic',auth_Student,  upload.single('picture'), upload_profilPic_student, (err, req, res, next) => {
    res.send(err.message)
});
router.get('/students/:id/profil', get_student_profile);
router.post('/students/login', login_student);
router.get('/students/me', auth_Student, get_me);
router.patch('/students/me', auth_Student, update_me);
router.delete('/students/me',auth_Student, delete_me);
router.get('/students/', get_All_students);
router.patch('/students/:id',auth_Lecturer, update_student);
router.delete('/students/:id',auth_Lecturer, delete_student);
router.get('/students/:id', auth_Lecturer, get_student);

export default router