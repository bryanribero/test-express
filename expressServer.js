import express from 'express'
import { config } from 'dotenv'
import { pool } from './pgConnection.js'

config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.get('/producto', async (req, res) => {
  const product = await pool.query('Select * FROM producto')

  return res.status(200).json({
    text: 'Productos encontrados con exito!',
    content: product.rows
  })
})

app.listen(PORT, () => {
  console.log('Servidor corriendo http://localhost:3000')
})
