import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/taskslice'
import userReducer from './features/userslice'
import pomoReducer from './features/pomoslice'
import settingsReducer from './features/settingslice'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
    pomo: pomoReducer,
    settings: settingsReducer,
  },
})
