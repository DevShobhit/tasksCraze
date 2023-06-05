import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  duration: 0.5 * 60,
  timeRemaining: 0.5 * 60,
  isRunning: false,
  breakStatus: 'inactive',
}

const pomoSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true
    },
    pauseTimer: (state) => {
      state.isRunning = false
    },
    resetTimer: (state) => {
      state.isRunning = false
      state.timeRemaining = state.duration
    },
    updateTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload
    },
    updateBreakStatus: (state, action) => {
      state.breakStatus = action.payload

      // Changing the timer according to break status of the application
      if (state.breakStatus === 'active') {
        state.duration = 1 * 60
        state.timeRemaining = 1 * 60
      } else {
        state.duration = 0.5 * 60
        state.timeRemaining = 0.5 * 60
      }
    },
  },
})

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimeRemaining,
  updateBreakStatus,
} = pomoSlice.actions

export default pomoSlice.reducer
