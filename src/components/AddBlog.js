import React from 'react'
import blogService from '../services/blogs'

const AddingBlogForm = ({setSuccessMessage, setErrorMessage, setBlogs, setAuthor, author, setUrl, url, setTitle, title}) => {

    const handleNewBlog = async (event) => {
      event.preventDefault()
  
      try {
        //await blogService.addBlog({ author, title, url })
        const result = await blogService.addBlog({ author, title, url })
        console.log(result)
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
        setAuthor('')
        setTitle('')
        setUrl('')
        console.log(title)
        setSuccessMessage(`Blog ${title} has been added.`)
        setTimeout(() => setSuccessMessage(null), 5000)
      } catch (e) {
        //console.log('Error: ', e)
        setErrorMessage(`Error: ${e}`)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  
    return (
      <div>
        <h2>Create a new blog:</h2>
        <form onSubmit={handleNewBlog}>
          <p>Title: <input type='text' name='title' minLength='1' required onChange={({ target }) => setTitle(target.value)}/></p>
          <p>Author: <input type='text' name='author' minLength='1' required onChange={({ target }) => setAuthor(target.value)}/></p>
          <p>Url: <input type='text' name='url' minLength='1' required onChange={({ target }) => setUrl(target.value)}/></p>
          <p><button type='submit'>Create</button></p>
        </form>
      </div>
    )
}

export default AddingBlogForm