import { useEffect, useState } from 'react'

const Recommend = (props) => {

  if (!props.show) {
    return null
  }

  const books = props.books.filter(book => book.genres.includes(props.user.data.me.favoriteGenre))

  return (
    <div>
      <h1>Recommendations</h1>
      <p>books in your favorite genre <em>{props.user.data.me.favoriteGenre}</em></p>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend