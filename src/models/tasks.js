const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  pomo: {
    type: Number,
    default: 0,
  },
  completedPomo: {
    type: Number,
    default: 0,
  },
  labels: [
    {
      type: String,
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 1,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks
