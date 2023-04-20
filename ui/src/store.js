import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/taskslice'
import userReducer from './features/userslice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
})
