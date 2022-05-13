import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux'
import {setFilter} from "../reducers/filterReducer";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content) {
      event.target.anecdote.value = ''
      //dispatch(createAnecdote(content))
      props.createAnecdote(content)
      //dispatch(setNotification(`you added new anecdote '${content}'`, 5))
      props.setNotification(`you added new anecdote '${content}'`, 5)
    } else {
      //dispatch(setNotification('Input field is empty', 3))
      props.setNotification('Input field is empty', 3)
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

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)