const express = require('express');

const booksQuery = require('../db/index');


const BookRouter = express.Router();
const routes = (nav) => {
  BookRouter.get('/', async (rep, res) => {
    const { rows: books } = await booksQuery.query('SELECT * FROM BOOKS');
    res.render('bookListView',
      {
        nav,
        title: 'Cuong Test',
        books
      });
  });
  BookRouter.get('/:id', async (rep, res) => {
    const { id } = rep.params;
    const { rows } = await booksQuery.query('Select * from books where id =$1', [id]);

    res.render('bookView',
      {
        nav,
        title: 'Cuong Test',
        book: rows[0]
      });
  });
  return BookRouter;
};

module.exports = routes;
