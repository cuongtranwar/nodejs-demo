const express = require('express');
const HttpConnector = require('../db/index');
const BookService = require('../service/goodreadsService');
const debug = require('debug')('app:bookRoutes');




const BookRouter = express.Router();
const httpConnector = new HttpConnector();
const bookService = new BookService();

const routes = (nav) => {
  BookRouter.get('/', async (rep, res) => {
    const books = await httpConnector.getAll('library', 'books');
    res.render('bookListView',
      {
        nav,
        title: 'Cuong Test',
        books
      });
  });
  BookRouter.get('/:id', async (rep, res) => {
    const { id } = rep.params;
    const book = await httpConnector.getById(id, 'library', 'books');
     book.details = await bookService.getBookById(book.bookId);
     debug(`Book Details : ${book.details}`);
    res.render('bookView',
      {
        nav,
        title: 'Cuong Test',
        book
      });
  });
  return BookRouter;
};

module.exports = routes;
