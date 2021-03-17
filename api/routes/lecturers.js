import express from 'express';
import  multer from 'multer';
import { 
    create_lecturer,
    login_lecturer,
    uploadProfile_lecturer,
    getProfile_lecturer,
    update_lecturer,
    delete_lecturer,
    getAll_lecturers,
    getSingle_lecturer 
} from '../controllers/lecturer.js'
import  { auth_Lecturer } from '../middleware/auth-lecturer.js';

const  uplaod = multer({
    limits : {
        fileSize : 1024 * 1024
    },
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.jpg')){
            return cb(new Error('Please uplaod an image'))
        }
        else{
            cb(undefined, true)
        }
    }
})

const  router = express.Router()

router.post('/lectures/', create_lecturer);
router.post('/lectures/login', login_lecturer)
router.post('/lectures/profil', auth_Lecturer, uplaod.single('picture'), uploadProfile_lecturer)
router.get('/lectures/me',auth_Lecturer, getProfile_lecturer)
router.patch('/lectures/me', auth_Lecturer, update_lecturer)
router.delete('/lectures/me', auth_Lecturer, delete_lecturer)

router.get('/lectures', getAll_lecturers)
router.get('/lectures/:id', getSingle_lecturer)


export default router;