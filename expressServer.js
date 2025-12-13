import express from 'express'
import { config } from 'dotenv'
import { pool } from './pgConnection.js'
import { handlePrice } from './middleware/handlePrice.js'
import { upload } from './middleware/upload.js'
import path from 'path'
import { registerValidator } from './validators/user/body.js'
import { validate } from './middleware/validate.js'

config()
const PORT = process.env.PORT

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.get('/productos', async (req, res) => {
  const product = await pool.query('Select * FROM producto')

  res.json(product.rows)
})

app.get('/descargar/:nombre', (req, res) => {
  const nombreArchivo = req.params.nombre
  const dirArchivo = path.resolve(`files/${nombreArchivo}`)

  res.download(dirArchivo, nombreArchivo, (err) => {
    if (err) {
      res.status(404).send('Archivo no encontrado')
    }
  })
})

app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
  res.send('Archivo enviado')
})

app.post('/productos', handlePrice, async (req, res) => {
  try {
    const { nombre_producto, precio_producto, stock_producto, id_comerciante } = req.body

    const product = await pool.query(
      `INSERT INTO producto("nombre_producto", "precio_producto", "stock_producto", "id_comerciante") VALUES($1, $2, $3, $4) RETURNING *`,
      [nombre_producto, precio_producto.toString(), stock_producto, id_comerciante]
    )

    res.json({ text: 'Producto ingresado con exito!', content: product.rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/usuarios', registerValidator, validate('Errores de /usuarios', 400), (req, res, _next) => {
  res.send('Usuario registrado con exito!')
})

app.use((req, res) => {
  res.status(404).send('La ruta no existe')
})

app.use((err, req, res, _next) => {
  const status = err.statusCode || 500

  res.status(status).json({ error: err.message, details: err.details || null })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo http://localhost:${PORT}`)
})
