import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './anecdoteReducer'
import notificationReducer from './notificationReducer';
import filterReducer from "./filterReducer";
import anecdoteService from '../services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
)

export default store
