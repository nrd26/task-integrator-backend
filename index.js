const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const db = require('./routes/queries')

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })    
  })

  app.get('/tasks', db.getTasks)
  app.post('/tasks', db.createTask)
  app.put('/tasks/:id', db.updateTask)
  app.delete('/tasks/:platform/:id', db.deleteTask)
  
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })