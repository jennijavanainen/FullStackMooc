import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {

  const blog = {
    title: 'testblog',
    author: 'tester',
    likes: 0,
    url: 'wwww.test.fi',
    user: {
      username: 'jennijii'
    }
  }

  const user = {
    username: 'jennijii'
  }

  test('displays only author and title', () => {
    const { container } = render(
      <Blog blog={blog} user={user}/>
    )
    //screen.debug()
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    const togglableDiv = container.querySelector('.togglableInfo')
    expect(togglableDiv).toHaveStyle('display: none')

  })

  test('displays url and likes after view-button is clicked', () => {
    const { container } = render(
      <Blog blog={blog} user={user}/>
    )
    const button = screen.getByText('view')
    userEvent.click(button)
    const div = container.querySelector('.blog')
    expect(div).toHaveStyle('display: block')
    expect(div).toHaveTextContent(blog.likes.toString())
    expect(div).toHaveTextContent(blog.url)

  })

  test('like-button pressed twice results two eventHandler calls', () => {
    const mockHandler = jest.fn()
    render(
      <Blog blog={blog} user={user} updateBlog={mockHandler}/>
    )

    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})