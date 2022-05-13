import { useDispatch, useSelector} from 'react-redux';
import Anecdote from './Anecdote';
import { addVote } from "../reducers/anecdoteReducer";
import { removeMessage, setMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  })

  const dispatch = useDispatch()

  const vote = (anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setMessage(`Voted anecdote ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
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
