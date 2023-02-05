import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { gql, useApolloClient, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommend')}>recommend</button> }
        { token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button> }
      </div>
      <Notify errorMessage={errorMessage} />

      { page === 'login' && <Login show={page === 'login'} setError={notify} setToken={setToken} /> }

      <Recommend show={page === 'recommend'} user={user} books={books.data.allBooks}/>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} authorGQL={ALL_AUTHORS} token={token} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} authorGQL={ALL_AUTHORS} bookGQL={ALL_BOOKS} />
    </div>
  )
}

export default App

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}
