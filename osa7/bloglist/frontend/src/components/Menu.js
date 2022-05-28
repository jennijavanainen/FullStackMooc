import { Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/blogs' >blogs</Link>
      <Link style={padding} to='/users' >users</Link>
      logged in as {props.username} <button onClick={props.logout}>logout</button>
    </div>
  )
}

export default Menu