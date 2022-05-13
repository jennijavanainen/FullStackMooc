import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initialize } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App