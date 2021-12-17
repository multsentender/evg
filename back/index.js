const express = require('express')
const router = require('./router')

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router)

app.listen(8000, () => {
    console.log(8000, 'Server has been starter')
})