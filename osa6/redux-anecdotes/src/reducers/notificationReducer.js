import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return initialState
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer