export const uploadImage = () => {
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
}