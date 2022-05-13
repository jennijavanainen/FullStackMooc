import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      const anecdote = action.payload
      return state.map(a =>
        a.id === anecdote.id ? anecdote : a
      )
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, updatedAnecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdotes(newAnecdote))
  }
}

export default anecdoteSlice.reducer