
const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user.username === user.username

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      added by {addedBy}
      {own &&<button onClick={() => removeBlog(blog.id)}>
        remove
      </button>}
    </div>
  )
}

export default Blog
