
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
  {
    title: 'Books',
    link: '/books',
  },
  {
    title: 'Authors',
    link: '/authors',
  }];
const BookRouter = require('./src/routes/bookRoutes')(nav);

app.use(morgan('tiny'));
app.use((rep, res, next) => {
  console.log(`my midleware ${res.toString()}`);
  next();
});
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', BookRouter);

app.get('/', (rep, res) => {
  res.render('index',
    {
      nav,
      title: 'Cuong Test'
    });
});
app.listen(port, () => {
  debug(`listening port : ${chalk.blue(`http://localhost:${port}/`)}`);
});
