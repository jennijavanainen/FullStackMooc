import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogPage = ({ blogs, blogFormRef, createBlog }) => {
  const style = {
    paddingTop: 5,
  }

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm
          onCreate={createBlog}
        />
      </Togglable>
      <h3 style={style}>Blogs</h3>
      <Table striped id='blogs'>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id} style={style}>
              <td>
                <Link to={`/blogs/${blog.id}`} >
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogPage