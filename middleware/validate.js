import { validationResult } from 'express-validator'

export const validate = (message = 'Error al cargar usuario', statusCode = 400) => {
  return (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error(message)
      err.statusCode = statusCode
      err.details = errors.array().map((e) => e.msg)

      next(err)
    }

    next()
  }
}
