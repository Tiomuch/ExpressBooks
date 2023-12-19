require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use((req, res, next) => {
  const origin = '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.setHeader('Access-Control-Allow-Credentials', 'false')
  next()
})

app.use(cors(corsOptions))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

app.listen(3001, () => console.log('Server Started at 3001'))
