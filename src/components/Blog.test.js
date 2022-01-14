import React from 'react'
import '@testing-library/dom' 
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'

test ('Rending author and title from blogs with clicking view', () => {

  const blog = {
    title: 'testi',
    author: 'pena',
    url: 'https://domain.fi',
    likes: '2',
    users: [{name: 'pena'}]
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
})

test ('Along with author and title, the url, the amount of likes and the user who has added the blog will be shown', () => {
  const blog = {
    title: 'testi',
    author: 'pena',
    url: 'https://domain.fi',
    likes: '2',
    users: [{name: 'pena'}]
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View blog info')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
  expect(component.container).toHaveTextContent(blog.users[0].name)
})