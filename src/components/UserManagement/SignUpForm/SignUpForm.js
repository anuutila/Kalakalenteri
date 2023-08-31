import '../UserManagement.css'

const SignUpForm = ({
  handleSubmit,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  handlePasswordAgainChange,
  username,
  email,
  password,
  passwordAgain
}) => {
  return (
    <div className="signUpFormContainer">
      <h2 className='signUpFormTitle'>REKISTERÖIDY</h2>

      <form onSubmit={handleSubmit}>
        <div className="signUpFormGrid">
          <label htmlFor="signUpUsername">käyttäjänimi:</label>
          <input
            id="signUpUsername"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="signUpEmail">sähköposti:</label>
          <input
            id="signUpEmail"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="signUpPassword">salasana:</label>
          <input
            id="signUpPassword"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="signUpPasswordAgain">toista salasana:</label>
          <input
            id="signUpPasswordAgain"
            type="password"
            value={passwordAgain}
            onChange={handlePasswordAgainChange}
          />
          <div></div> {/* Empty grid item for spacing */}
        </div>
        <button className='button' id="signUpButton" type="submit">Rekisteröidy</button>
      </form>
    </div>
  )
}

export default SignUpForm