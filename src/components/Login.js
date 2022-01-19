import React from 'react'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
          Username
        <input type='text' value={username} name='Username' id='Username' onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
          Password
        <input type='password' value={password} name='Password' id='Password' onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>Log me in</button>
    </form>
  )
}

export default LoginForm