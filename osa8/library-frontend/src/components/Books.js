import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const FILTER_BOOKS = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      genres
      title
      author {
        name
      }
      published
    }
  }
`

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState(null)
  const [filterInfo, setFilterInfo] = useState('')
  const [genres, setGenres] = useState([])

  const filteredBooks = useQuery(FILTER_BOOKS, {
    variables: { genre: filter },
    skip: !filter,
    refetchQueries: [{ query: props.bookGQL, FILTER_BOOKS }]
  })

  useEffect(() => {
    setBooks(props.books)
    setGenres([...new Set(props.books.map(b => b.genres).reduce((result, current) => result.concat(current), []))])
  }, [filteredBooks])

  if (!props.show) {
    return null
  }
  const genreFilter = async (genre) => {
    if (genre === '') {
      setFilterInfo('')
      setFilter('')
    } else {
      setFilter(genre)
      setFilterInfo(`in genre ${genre}`)
    }
  }


  return (
    <div>
      <h2>books</h2>
      <h3>{filterInfo}</h3>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {filter && filteredBooks.data && filteredBooks.data.allBooks.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        {!filter && books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={() => genreFilter('')}>all genres</button>
      {genres.map((g, i) => <button key={i} onClick={() => genreFilter(g)}>{g}</button>)}
    </div>
  )
}

export default Books
