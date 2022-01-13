import React, { useState, useEffect, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import AddingBlogForm from './components/AddBlog'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

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

const BlogForm = ({ user, handleLogout, setSuccessMessage, setErrorMessage, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title }) => {
  blogs.sort(function(a,b) {
    return b.likes - a.likes
  })
  //console.log(user)
  return (
    <div>
        User {user.name} has logged in. <form onSubmit={handleLogout}><button type='submit'>Logout</button></form>

      < AddingBlogForm setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setBlogs={setBlogs} setAuthor={setAuthor} author={author} setUrl={setUrl} url={url} setTitle={setTitle} title={title} />

      {blogs.map(blog =>
        <div key={blog.title}>< Blog blog={blog} setBlogs={setBlogs}/></div>
      )}
    </div>

  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [loginShown, setLoginShown] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('userIdentification', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`User ${user.name} successfully logged in.`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (e) {
      //console.log('Error: ', e) //Errormessagesystem?
      //console.log(e)
      setErrorMessage('Error: wrong username or password!')
      //console.log(errorMessage)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    //event.preventDefault()
    window.localStorage.removeItem('userIdentification')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      //console.log(blogs)
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
    /*const hideLogin = { display: loginShown ? 'none' : ''}
    const showLogin = { display: loginShown ? '' : 'none'}

    return (
        <div>
          <div style={hideLogin}>
            <button onClick={() => setLoginShown(true)}>Login</button>
          </div>
          <div style={showLogin}>
            < LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginShown={loginShown} setLoginShown={setLoginShown} />
          </div>
        </div>
    )*/
    return (
      <Togglable buttonLabel='Login'>
        < LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginShown={loginShown} setLoginShown={setLoginShown} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>Blogs:</h2>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      {user === null && loginForm()}
      {user !== null && BlogForm({ user, handleLogout, setSuccessMessage, setErrorMessage, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title })}
    </div>
  )
}

export default App