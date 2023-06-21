import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pomoDur: 25,
  timeRemaining: 25,
  shortBreakDur: 5,
  longBreakDur: 15,
  longBreakAfter: 4,
  autoStartBreak: false,
  autoStartNextPomo: false,
  isRunning: false,
  breakStatus: 'inactive', // inactive || shortbreak || longBreak
}

const pomoSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    // Pomodoro Settings
    updatePomoSettings: (state, action) => {
      const updates = Object.keys(action.payload)
      updates.forEach((update) => {
        state[update] = action.payload[update]
      })
      state.timeRemaining = state.pomoDur
    },

    // General Pomodoro
    startTimer: (state) => {
      state.isRunning = true
    },
    pauseTimer: (state) => {
      state.isRunning = false
    },
    resetTimer: (state) => {
      state.isRunning = false
      state.timeRemaining = state.pomoDur
    },
    updateTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload
    },
    updateBreakStatus: (state, action) => {
      state.breakStatus = action.payload

      // Changing the timer according to break status of the application
      if (state.breakStatus === 'active') {
        state.pomoDur = 1
        state.timeRemaining = 1
      } else {
        state.pomoDur = 25
        state.timeRemaining = 25
      }
    },
  },
})

export const {
  updatePomoSettings,
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimeRemaining,
  updateBreakStatus,
} = pomoSlice.actions

export default pomoSlice.reducer
