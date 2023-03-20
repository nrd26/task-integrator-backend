const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  })


//PgSQL GET
  async function pgGet() {
    var results = []
    pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, pgResults) => {
        if (error) {
          throw error
        }
        for (let index = 0; index < pgResults.rowCount; index++) {
          results.push(pgResults.rows[index])
        }
      })
      return results;
  }

  //PgSQL POST
  async function pgPost(task, platform, response) {
    pool.query('INSERT INTO tasks (task, platform) VALUES ($1, $2) RETURNING *', [task, platform], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Task added with ID: ${results.rows[0].id}`)
      })
  }

  //PgSQL PUT
  async function pgPut(id, task, platform, response) {
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

  //PgSQL DELETE
  async function pgDelete(id, response) {
    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Task deleted with ID: ${id}`)
      })
  }

  module.exports = {
    pgGet,
    pgPost,
    pgPut,
    pgDelete
  }