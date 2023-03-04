const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'dbpassword',//Change to your password
  port: 5432,
})

// GET all tasks
const getTasks = (request, response) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//   GET a single task by ID
  const getTaskById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//   POST a new task
const createTask = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO tasks (name) VALUES ($1) RETURNING *', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Task added with ID: ${results.rows[0].id}`)
    })
  }
//   PUT updated data in an existing task
const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body
  
    pool.query(
      'UPDATE tasks SET name = $1 WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Task modified with ID: ${id}`)
      }
    )
  }
//   DELETE a task
const deleteTask = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Task deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  }