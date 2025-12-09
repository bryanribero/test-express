import multer from 'multer'
import { storage } from '../multerConfig.js'

export const upload = multer({ storage: storage })
