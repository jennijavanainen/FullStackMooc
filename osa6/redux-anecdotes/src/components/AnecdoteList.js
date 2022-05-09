import { useSelector } from 'react-redux';
import Anecdote from "./Anecdote";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      { anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        )
      }
    </div>
  )

}

export default AnecdoteList
