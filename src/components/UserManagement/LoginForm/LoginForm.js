import '../UserManagement.css'

const LoginForm = ({
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  email,
  password
}) => {
  return (
    <div className="loginFormContainer">
      <h2 className='loginFormTitle'>KIRJAUDU SISÄÄN</h2>

      <form onSubmit={handleSubmit}>
        <div className="loginFormGrid">
          <label htmlFor="email">sähköposti:</label>
          <input
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">salasana:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div></div> {/* Empty grid item for spacing */}
        </div>
      <button className="button" id='loginButton' type="submit">Kirjaudu sisään</button>
      </form>
    </div>
  )
}

export default LoginForm