import { useDispatch, useSelector} from 'react-redux';
import Anecdote from './Anecdote';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  })

  const dispatch = useDispatch()

  const vote = (anecdote => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes +1
    }
    dispatch(voteAnecdote(anecdote.id, updatedAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  })

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote}/>
        )
      }
    </div>
  )

}

export default AnecdoteList
