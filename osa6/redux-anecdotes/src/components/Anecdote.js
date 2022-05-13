
const Anecdote = ({ anecdote, vote }) => {

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  )

}

export default Anecdote