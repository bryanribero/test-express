import { body } from 'express-validator'

export const handlePrice = [
  body('precio_producto').isFloat({ min: 0 }).withMessage('El precio debe de ser un numero mayor a 0'),
  body('nombre_producto').notEmpty().withMessage('Nombre no puede estar vacio')
]
