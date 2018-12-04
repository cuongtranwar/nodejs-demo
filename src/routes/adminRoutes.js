const express = require ('express');
const HttpConnector = require('../db/index');
const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const debug = require('debug')('app:adminRoutes');

const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      bookId: 656,
      read: false    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      bookId: 24280,
       read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }];

const adminRouter = express.Router();
const httpConnector  = new HttpConnector();
const router = (nav) => {
    adminRouter.get('/', async (rep, res) => {
        const result = await httpConnector.insertMany('books',books,'library');
        res.json(result);
    });
    return adminRouter;
}

module.exports = router;