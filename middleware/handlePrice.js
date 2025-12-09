export function handlePrice(req, res, next) {
  const price = req.body.precio_producto

  if (price < 0) {
    return res.status(400).send('Valor de price no permitido')
  }

  next()
}
