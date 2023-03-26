const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const taskRouter = require('./routes/routes')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Router
app.use('/tasks',taskRouter)
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })