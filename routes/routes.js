const express = require('express')
const router = express.Router()
const tasks = require('../controllers/tasks')

router.get('/', tasks.getTasks)
router.post('/', tasks.createTask)
router.put('/:id', tasks.updateTask)
router.delete('/:platform/:id', tasks.deleteTask)

module.exports = router