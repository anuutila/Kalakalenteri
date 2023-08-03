const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Kirjaudu sisään</h2>

      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          käyttäjänimi:
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          salasana:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="loginButton" type="submit">Kirjaudu sisään</button>
      </form>
    </div>
  )
}

export default LoginForm