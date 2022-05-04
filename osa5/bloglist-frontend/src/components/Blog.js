import React from 'react'
import {useState} from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggle = () => {
    setShowInfo(!showInfo)
  }

  const visible = {
    display: showInfo ? '' : 'none'
  }

  const addLikes = (event) => {
    event.preventDefault()

    updateBlog(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

  }

  const removeButton = {
    display: blog.user.id === user.id ? 'none' : ''
  }

  const remove = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`) ? deleteBlog(blog.id) : toggle()
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={toggle}>{showInfo ? 'hide' : 'view'}</button>
      <div style={visible}>
        {blog.url} <br></br>
        likes: {blog.likes} <button onClick={addLikes}>like</button><br></br>
        user: {blog.user.username} <br></br>
        <button onClick={remove} style={removeButton}>remove</button>
      </div>
    </div>
  )
}

export default Blog
