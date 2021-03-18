import express from 'express';
import  multer from 'multer';
import { 
create_lecturer,
login_lecturer,
getProfile_lecturer,
update_lecturer,
delete_lecturer,
getAll_lecturers,
getSingle_lecturer 
} from '../controllers/lecturer.js'
import  { auth_Lecturer } from '../middleware/auth-lecturer.js';

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './images/')
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
  
const  router = express.Router()

router.post('/', upload.single('lecturePicture'), create_lecturer); // add image 
router.post('/login', login_lecturer)
router.get('/me', auth_Lecturer, getProfile_lecturer)
router.put('/me/:id', auth_Lecturer, update_lecturer)
router.delete('/me/:id', auth_Lecturer, delete_lecturer)

router.get('/', getAll_lecturers)
router.get('/:id', getSingle_lecturer)


export default router;