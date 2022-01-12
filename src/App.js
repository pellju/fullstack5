import React, { useState, useEffect } from 'react'
//import Blog from './components/Blog'
import loginService from './services/login' 
import blogService from './services/blogs'

const Success = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('userIdentification', JSON.stringify(user))
      
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`User ${user.name} successfully logged in.`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (e) {
      //console.log('Error: ', e) //Errormessagesystem?
      //console.log(e)
      setErrorMessage(`Error: wrong username or password!`)
      console.log(errorMessage)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      await blogService.addBlog({ author, title, url })
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

  const handleLogout = (event) => {
    //event.preventDefault()

    window.localStorage.removeItem('userIdentification')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      console.log(blogs)
    })  
  }, [])

  useEffect(() => {
    const hasUserLoggedIn = window.localStorage.getItem('userIdentification')
    if (hasUserLoggedIn) {
      const user = JSON.parse(hasUserLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password
          <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const addingBlogForm = () => {
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

  const blogForm = () => {
    //console.log(user)
    return (
       <div>
          User {user.name} has logged in. <form onSubmit={handleLogout}><button type='submit'>Logout</button></form>

          {addingBlogForm()}

          {blogs.map(blog => 
            <div key={blog.title}>{blog.title} - {blog.author}</div>
          )}      
       </div>
        
    )
  }
  return (
    <div>
      <h2>Blogs:</h2>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App