import { useState } from 'react'

const createNewForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNew = (event) => {
    event.preventDefault()
    addBlog({
      author: author,
      title: title,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={ createNew }>
      <h2>Create new</h2>
      <div>
        title:
        <input
          type="text"
          value={ title }
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>

  )
}
export default createNewForm