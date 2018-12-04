
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
const AdminRouter = require('./src/routes/adminRoutes')(nav);
const AuthRouter = require('./src/routes/authRoutes')(nav);
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passportConfig.js')(app);


app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/books', BookRouter);
app.use('/admin', AdminRouter);
app.use('/auth', AuthRouter);

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
