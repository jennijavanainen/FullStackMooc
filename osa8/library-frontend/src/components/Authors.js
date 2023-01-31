import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'

const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $bornNum: Int!){
        editAuthor(
            name: $name
            setBornTo: $bornNum
        )
    {
        name
        born
        bookCount
      }
    }
`;

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: props.authorGQL }]})

  if (!props.show) {
    return null
  }
  const authors = props.authors

  let editOptions = [];
  for(let a in authors){
    editOptions.push({value: authors[a].name, label: authors[a].name })
  }

  const submit = async (event) => {
    event.preventDefault()
    const bornNum = Number(born)
    await updateAuthor({ variables: { name, bornNum } })
    setName('')
    setBorn('')

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>edit birthyear</h2>
      { editOptions && <form onSubmit={submit}>
        <Select options={editOptions} onChange={value => setName(value.value)} />
        <div>
          Born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form> }
    </div>
  )
}

export default Authors
