const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'task_test',
  password: 'password',
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

//   GET a single Task by ID
  const getTaskById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//   POST a new Task
const createTask = (request, response) => {
    const { task, platform } = request.body
  
    pool.query('INSERT INTO tasks (task, platform) VALUES ($1, $2) RETURNING *', [task, platform], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Task added with ID: ${results.rows[0].id}`)
    })
  }
//   PUT updated data in an existing Task
const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    const { task, platform } = request.body
  
    pool.query(
      'UPDATE tasks SET task = $1, platform = $2 WHERE id = $3',
      [task, platform, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Task modified with ID: ${id}`)
      }
    )
  }
//   DELETE a Task
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