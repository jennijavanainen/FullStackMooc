import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
    setNotification({ text, type })
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
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`Added new blog: ${returnedBlog.title} by ${returnedBlog.author} `, 'info')
      }).catch(() => notify('Error occurred', 'alert')
      )
  }

  const updateBlog = (id, updatedBlog) => {
    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        notify(`Like for blog: ${returnedBlog.title} by ${returnedBlog.author} saved `, 'info')
      }).catch(() => notify('Error occurred', 'alert')
      )
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(p => p.id !== id))
        notify('Blog successfully removed', 'info')
      }).catch(() => notify('Error', 'alert')
      )
  }

  if (user === null) {
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification message={notification}/>
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
      <Notification message={notification}/>
      <p>logged in as {user.name}
        <button onClick={logout}>logout</button>
      </p>
      <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
        <CreateNewForm addBlog={addBlog}/>
      </Togglable>
      <h2>Saved blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          user={user}
          deleteBlog={deleteBlog}/>
      )}
    </div>
  )

}

export default App