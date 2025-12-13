import { body } from 'express-validator'

export const registerValidator = [
  body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
  body('email').isEmail().withMessage('Debe ser un email valido')
]
