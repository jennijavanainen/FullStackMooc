import { Link } from 'react-router-dom'

const UserPage = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
          { users.map(user => <Line key={user.id} id={user.id} user={user.name} blogs={user.blogs.length} />)}
        </tbody>
      </table>
    </div>
  )
}

const Line = ({ user, blogs, id }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${id}`}>{user}</Link></td>
      <td> {blogs} </td>
    </tr>
  )
}

export default UserPage