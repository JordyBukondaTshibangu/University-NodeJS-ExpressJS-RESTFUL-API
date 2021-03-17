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

// const  uplaod = multer({
//     limits : {
//         fileSize : 1024 * 1024
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.endsWith('.jpg')){
//             return cb(new Error('Please uplaod an image'))
//         }
//         else{
//             cb(undefined, true)
//         }
//     }
// })

// try {
    //     const resizedPic = await sharp(req.file.buffer).resize({width : 200, height : 200}).png().toBuffer()
    //     req.lecture.picture = resizedPic
    //     await req.lecture.save()
    //     res.send('Image Successfully uploaded')
    // }catch(err){
    //     (err, req, res, next) => {
    //         res.send('Error')}
//     }

const  router = express.Router()

router.post('/', create_lecturer); // add image 
router.post('/login', login_lecturer)
router.get('/me', auth_Lecturer, getProfile_lecturer)
router.put('/me/:id', auth_Lecturer, update_lecturer)
router.delete('/me/:id', auth_Lecturer, delete_lecturer)

router.get('/', getAll_lecturers)
router.get('/:id', getSingle_lecturer)


export default router;