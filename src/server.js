require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

app.listen(3001, () => console.log('Server Started at 3001'))
