import { body } from 'express-validator'

export const registerValidator = [
  body('email').isEmail().withMessage('Debe contener un correo valido'),
  body('password').isLength({ min: 6, max: 12 }).withMessage('Password debe de contener un tamaño de 6 a 12 caracteres')
]
