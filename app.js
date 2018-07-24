const bodyParser = require('body-parser');
const express = require('express');
const calcsRouter = require('./routes/calcs');
const livroRouter = require('./routes/livro');

const env = process.env.NODE_ENV || 'development';

const app = express();

// ----- Middlewares -----
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// ----- Middlewares -----


app.use(function (req, res, next) {
  var d = new Date(1970, 1, 1, 0, 0, 0, 0);
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('LOG: ', Date(Date.now())+ ' ' + fullUrl)
  next()
})

// ----- Routes -----
app.get('/hello', (req, res) => {
  res.status(200).send({message: 'hello world'});
});

app.use('/calcs', calcsRouter);

app.use('/livro', livroRouter)
// ----- Routes -----


// ----- Error handlers -----
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (env === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).send({
      error: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
// ----- Error handlers -----

module.exports = app;
