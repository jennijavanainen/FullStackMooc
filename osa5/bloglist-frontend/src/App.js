import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import CreateNewForm from "./components/CreateNewForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, type) => {
    setNotification({text, type})
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('login succeeded', 'info')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
    console.log('logging in with', username, password)
  }

  const logout = (event) => {
    //event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const createNew = (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        notify(`Added new blog: ${returnedBlog.title} by ${returnedBlog.author} `, 'info')
      }).catch(() => notify('Error occurred', 'alert')
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={notification} />
        <LoginForm
          password={password}
          user={user}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={notification} />
      <p>logged in as {user.name} <button onClick={logout}>logout</button></p>
      <h2>Create new</h2>
      <CreateNewForm
        title={title}
        author={author}
        url={url}
        createNew={createNew}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
      <h2>Saved blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App