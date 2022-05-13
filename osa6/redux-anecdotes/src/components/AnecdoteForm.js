import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content) {
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
      dispatch(setNotification(`you added new anecdote '${content}'`, 5))
    } else {
      dispatch(setNotification('Input field is empty', 3))
    }

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