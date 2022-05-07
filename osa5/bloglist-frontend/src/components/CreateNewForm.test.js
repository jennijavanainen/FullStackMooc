import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNewForm from "./CreateNewForm";
import userEvent from '@testing-library/user-event'

describe('CreateNewForm component', () => {
  test('correct information is passed when new blog is created', () => {
    const addBlog = jest.fn()

    const { container } = render(
      <CreateNewForm addBlog={addBlog}/>
    )

    const inputTitle = container.querySelector('#title-input')
    const inputAuthor = container.querySelector('#author-input')
    const inputUrl = container.querySelector('#url-input')
    const sendButton = screen.getByText('create')

    userEvent.type(inputTitle, 'title test')
    userEvent.type(inputAuthor, 'author test')
    userEvent.type(inputUrl, 'url test')
    userEvent.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toStrictEqual({
      title: 'title test',
      author: 'author test',
      url: 'url test'
    })
  })
})