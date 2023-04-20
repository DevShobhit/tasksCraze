import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  activeTask: null,
  loading: false,
  updating: false,
  error: null,
}

export const fetchTasks = createAsyncThunk('user/fetchTasks', async () => {
  const response = await axios.get('/api/tasks')
  return response.data
})

export const deleteTask = createAsyncThunk('user/deleteTask', async (id) => {
  const response = await axios.delete(`/api/tasks/${id}`)
  return response.data
})

export const updateTask = createAsyncThunk('user/updateTask', async (task) => {
  let updatedtask = { ...task }
  delete updatedtask._id
  const response = await axios.patch(`/api/tasks/${task._id}`, updatedtask)
  return response.data
})

export const createTask = createAsyncThunk('user/createTask', async (task) => {
  const response = await axios.post('/api/tasks', task)
  return response.data
})

export const taskSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeTask = action.payload
    },
    clearActive: (state) => {
      state.activeTask = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.tasks
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(updateTask.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.items.findIndex(
          (task) => task._id == action.payload._id
        )
        state.items[task] = action.payload
        state.updating = false
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updating = false
        state.error = action.error.message
      })

      .addCase(createTask.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.updating = false
        state.items.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.updating = false
        state.error = action.error.message
      })

      .addCase(deleteTask.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.updating = false
        state.items = state.items.filter(
          (task) => task._id !== action.payload._id
        )
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.updating = false
        state.error = action.error.message
      })
  },
})

export const { setActive, clearActive } = taskSlice.actions

export default taskSlice.reducer
