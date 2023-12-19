const express = require('express')
const router = express.Router()
const Book = require('../models/book')

const getBook = async (req, res, next) => {
  let book

  try {
    book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Cannot find a book' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

  res.book = book
  next()
}

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()

    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book)
})

// Create book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    text: req.body.text,
  })

  try {
    const newBook = await book.save()

    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update book
router.patch('/:id', getBook, async (req, res) => {
  if (!!req.body.title) {
    res.book.title = req.body.title
  }

  if (!!req.body.author) {
    res.book.author = req.body.author
  }

  if (!!req.body.text) {
    res.book.text = req.body.text
  }

  try {
    const updatedBook = await res.book.save()

    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.deleteOne()

    res.json({ message: 'Book was deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
