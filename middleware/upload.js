import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files')
  },
  filename: (req, file, cb) => {
    const newName = `${Date.now()}${file.originalname}`

    cb(null, newName)
  }
})

export const upload = multer({ storage })
