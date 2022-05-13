import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
  id: null,
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { id: state.id, message: action.payload }
    },
    removeMessage(state, action) {
      return initialState
    },
    resetTimeout(state, action) {
      clearTimeout(state.id)
      return state
    },
    setTimeoutID(state, action) {
      return { id: action.payload, message: state.message }
    }
  }
})

export const { setMessage, removeMessage, resetTimeout, setTimeoutID } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(resetTimeout())
    dispatch(setMessage(message))
    const timeoutID = setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
    dispatch(setTimeoutID(timeoutID))
  }
}

export default notificationSlice.reducer