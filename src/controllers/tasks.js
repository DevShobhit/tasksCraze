const Tasks = require('../models/tasks')

const getAll = async (req, res) => {
  const userid = req.user._id

  try {
    const tasks = await Tasks.find({ owner: userid })
    res.status(200).json({
      tasks: tasks,
    })
  } catch (e) {
    res.status(500).send()
  }
}

const updateTask = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    'title',
    'description',
    'completedPomo',
    'pomo',
    'completed',
    'priority',
  ]
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid Updates :(' })
  }

  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!task) {
      return res.status(400).send({ error: 'Task did not exist :(' })
    }

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(400).send()
  }
}

const createTask = async (req, res) => {
  const task = new Tasks({
    ...req.body,
    owner: req.user._id,
    order: 0,
    ref: 'User',
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send('Could Not Create the User :(')
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
}

const reorderTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({ owner: req.user._id })
    const reorderedTasks = req.body

    const updates = {}

    reorderedTasks.forEach((task, index) => (updates[task['_id']] = index))
    tasks.forEach((task) => (task.order = updates[task['_id']]))
    tasks.forEach(async (task) => task.save())

    res.send(tasks)
  } catch (e) {
    res.status(400).send()
  }
}

module.exports = { getAll, updateTask, createTask, deleteTask, reorderTasks }
