import { useEffect, useState } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [filterInfo, setFilterInfo] = useState('')

  useEffect(() => {
    setBooks(props.books)
    setFilteredBooks(books)
  }, [])

  if (!props.show) {
    return null
  }

  const genreFilter = (filter) => {
    setFilteredBooks(books.filter(book => book.genres.includes(filter)))

    if (filter === '') {
      setFilterInfo('')
      setFilteredBooks(books)
    } else {
      setFilterInfo(`in genre ${filter}`)
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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => genreFilter('')}>all genres</button>
      {books.map(b => b.genres.map((g, i) => <button key={i} onClick={() => genreFilter(g.toString())}>{g}</button>))}
    </div>
  )
}

export default Books
