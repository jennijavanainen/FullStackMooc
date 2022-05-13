import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setMessage(`Added new anecdote ${content}`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ addNew }>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )


}

export default AnecdoteForm