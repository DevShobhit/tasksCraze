import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleOpen } = settingsSlice.actions

export default settingsSlice.reducer
