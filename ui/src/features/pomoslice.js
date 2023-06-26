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
  pomoStatus: 'active', // active || shortBreak || longBreak
  breakCounts: 0,
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
    resetTimer: (state, action) => {
      state.timeRemaining =
        action.payload === 'active'
          ? state.pomoDur
          : action.payload === 'shortBreak'
          ? state.shortBreakDur
          : state.longBreakDur
    },
    updateTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload
    },

    resetPomoStatus: (state) => {
      state.pomoStatus = 'active'
      state.breakCounts = 0
    },

    updatePomoStatus: (state, action) => {
      state.pomoStatus = action.payload
    },

    increaseBreakCounts: (state) => {
      state.breakCounts += 1
    },

    resetBreakCounts: (state) => {
      state.breakCounts = 0
    },
  },
})

export const {
  updatePomoSettings,
  startTimer,
  pauseTimer,
  resetTimer,
  updateTimeRemaining,
  updatePomoStatus,
  increaseBreakCounts,
  resetBreakCounts,
  resetPomoStatus,
} = pomoSlice.actions

export default pomoSlice.reducer
