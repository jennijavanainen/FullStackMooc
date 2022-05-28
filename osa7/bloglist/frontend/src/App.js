import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import userService from './services/user'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import Menu from './components/Menu'
import { Routes, Route, useMatch } from 'react-router-dom'
import BlogPage from './components/BlogPage'
import UserPage from './components/UserPage'
import User from './components/User'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { useRef } from 'react'

const App = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])

  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  useEffect(() => {
    userService.getAll().then(allUsers =>
      setUsers(allUsers)
    )
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(byLikes) )
    )
  }, [])

  const dispatch = useDispatch()

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      setUser(user)
      userService.setUser(user)
      notify(`${user.name} logged in!`, 'info')
    }).catch(() => {
      notify('wrong username/password', 'alert')
    })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!', 'info')
  }

  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`, 'info')
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
    }).catch(error => {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`, 'info')
      const updatedBlogs = blogs
        .map(b => b.id===id ? updatedBlog : b)
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }

  const notify = (message, type) => {
    dispatch(createNotification(type, message,4))
  }

  const userMatch = useMatch('/users/:id')
  const userToShow = userMatch
    ? users.find(user => user.id === String(userMatch.params.id))
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogs.find(blog => blog.id === String(blogMatch.params.id))
    : null

  if (user === null) {
    return <>
      <Notification/>
      <LoginForm onLogin={login} />
    </>
  }

  return (
    <div className='container'>
      <Menu username={user.name} logout={logout}/>
      <h1>Blog App</h1>
      <Notification />
      <Routes>
        <Route path='/blogs' element={<BlogPage blogs={blogs} blogFormRef={blogFormRef} createBlog={createBlog}/>} />
        <Route path='/users' element={<UserPage users={users}/>} />
        <Route path='/users/:id' element={<User user={userToShow} />} />
        <Route path='/blogs/:id' element={<Blog blog={blogToShow} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />} />
      </Routes>
    </div>
  )
}

export default App