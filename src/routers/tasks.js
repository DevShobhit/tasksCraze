const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasks')
const auth = require('../middlewares/auth')

router.get('/api/tasks', auth, (req, res) => {
  taskController.getAll(req, res)
})

router.patch('/api/tasks/:id', auth, (req, res) => {
  taskController.updateTask(req, res)
})

router.post('/api/tasks', auth, (req, res) => {
  taskController.createTask(req, res)
})

router.delete('/api/tasks/:id', auth, (req, res) => {
  taskController.deleteTask(req, res)
})

router.post('/api/tasks/reorder', auth, (req, res) => {
  taskController.reorderTasks(req, res)
})

module.exports = router
