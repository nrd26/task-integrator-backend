const pgClient = require('../config/pgConfig')


//PgSQL GET
  async function pgGet() {
    return new Promise((resolve, reject) => {
      let results = []
      pgClient.query('SELECT * FROM tasks ORDER BY id ASC', (error, pgResults) => {
        if (error) {
          reject(error);
        }
        for (let index = 0; index < pgResults.rowCount; index++) {
          results.push(pgResults.rows[index])
        }
        resolve(results)
      })
    })
  }

  //PgSQL POST
  async function pgPost(task, platform, response) {
    pgClient.query('INSERT INTO tasks (task, platform) VALUES ($1, $2) RETURNING *', [task, platform], (error, results) => {
        if (error) {
          response.send(`Could not add task ${task} in ${platform} due to error ${error}`)
        }
        response.status(201).send(`Task added with ID: ${results.rows[0].id}`)
      })
  }

  //PgSQL PUT
  async function pgPut(id, task, platform, response) {
    pgClient.query(
        'UPDATE tasks SET task = $1, platform = $2 WHERE id = $3',
        [task, platform, id],
        (error, results) => {
          if (error) {
            response.send(`Could not edit task ${task} with id ${id} in ${platform} due to error ${error}`)
          }
          response.status(200).send(`Task modified with ID: ${id}`)
        }
      )
  }

  //PgSQL DELETE
  async function pgDelete(id, response) {
    pgClient.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
          response.send(`Could not delete task  with id ${id} in Cubyts due to error ${error}`)
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