import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const text = {
    color: '#FFFFFF',
    paddingRight: 10
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/blogs' >blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users' >users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <em style={text} >logged in as {props.username}</em>
            <button onClick={props.logout}>logout</button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>



  )
}

export default Menu

/*
<div>
<Link style={padding} to='/blogs' >blogs</Link>
<Link style={padding} to='/users' >users</Link>
logged in as {props.username} <button onClick={props.logout}>logout</button>
</div>

*/