import React, { useState } from 'react'

const Blog = ({ blog }) => {
  //console.log(blog)
  const [showingBlog, setShowingBlog] = useState(false)

  const hideBlog = { display: showingBlog ? 'none' : '' }
  const showBlog = { display: showingBlog ? '' : 'none' }

  const listBlogs = () => {
    return (
      <div>
        <div style={hideBlog}>
          {blog.title} - {blog.author} <button onClick={() => setShowingBlog(true)}>View blog info</button>
        </div>
        <div style={showBlog}>
          <div>{blog.title} - {blog.author} <button onClick={() => setShowingBlog(false)}>Hide blog info</button></div>
          <div>Url: {blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <div>Added by: {blog.users[0].name}</div>
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