import React, { useState } from 'react'
import blogService from '../services/blogs'

const removeBlog = async (blog, setBlogs) => {
  const blogId = blog.id.toString()

  try {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      const response = await blogService.removeBlog(blogId)
      setBlogs(response)
    }
  } catch (e) {
    console.log(e)
  }
}

const increaseLike = async (blog, setBlogs) => {
  //console.log(blog)
  //event.preventDefault()

  try {
    const response = await blogService.addLike(blog.title, blog.author, blog.url, blog.likes + 1, blog.id).then()
    //const newBlogs = await blogService.getAll()
    setBlogs(response)
  } catch (e) {
    console.log(e)
  }
}

const Blog = ({ blog, setBlogs }) => {
  console.log(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showingBlog, setShowingBlog] = useState(false)

  const hideBlog = { display: showingBlog ? 'none' : '' }
  const showBlog = { display: showingBlog ? '' : 'none' }

  const listBlogs = () => {
    return (
      <div style={blogStyle}>
        <div style={hideBlog}>
          {blog.title} - {blog.author} <button onClick={() => setShowingBlog(true)}>View blog info</button>
        </div>
        <div style={showBlog}>
          <div>{blog.title} - {blog.author} <button onClick={() => setShowingBlog(false)}>Hide blog info</button></div>
          <div>Url: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={() => increaseLike(blog, setBlogs)}>Like</button></div>
          <div>Added by: {blog.users[0].name}</div>
          <div><button onClick={() => removeBlog(blog, setBlogs)}>Remove blog</button></div>
          <br></br>
        </div>
      </div>
    )
  }

  return (
    <div>
      {listBlogs()}
    </div>
  )
}


export default Blog