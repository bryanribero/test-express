import { validationResult } from 'express-validator'

export const validate = (message = 'Error al cargar usuario', statusCode = 400) => {
  return (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return next({
        status: statusCode,
        message: message,
        details: errors.array()
      })
    }

    next()
  }
}
