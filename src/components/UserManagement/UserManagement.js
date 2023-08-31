import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaUserAlt } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import LoginForm from './LoginForm/LoginForm';
import SignInForm from './SignUpForm/SignUpForm';
Modal.setAppElement('#root');

const UserManagement = ({
  user,
  toggleUserManagement,
  userManagementVisible,
  setUserManagementVisible,
  email,
  password,
  newUsername,
  newEmail,
  newPassword,
  newPasswordAgain,
  setEmail,
  setPassword,
  setNewUsername,
  setNewEmail,
  setNewPassword,
  setNewPasswordAgain,
  handleLogin,
  addUser,
  handleLogout
}) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const borderRadius = window.innerWidth < 1024 ? '2rem' : '1rem'

  return (
    <>
      <div className='userIcon' onClick={toggleUserManagement}><FaUserAlt /></div>
      <Modal
        isOpen={userManagementVisible}
        onRequestClose={() => setUserManagementVisible(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={{
          overlay: {
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0, .8)",
            zIndex: "1000",
            overflowY: "auto"
          },
          content: {
            position: 'absolute',
            zIndex: '1000',
            height: 'fit-content',
            margin: 'auto',
            width: 'fit-content',
            border: '0.2rem solid #888',
            background: '#2a2a2a',
            overflow: 'auto',
            borderRadius: borderRadius,
            outline: 'none',
            padding: '0'
          }
        }}
      >
        <div className='userManagementContentContainer'>
          <div className='closeUserManagementButton' onClick={() => setUserManagementVisible(false)}><IoClose></IoClose></div>
          {!user && !showSignUp && (
            <>
              <LoginForm
                email={email}
                password={password}
                handleEmailChange={({ target }) => setEmail(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
              <div className="registerLinkButtonContainer">
                <span>
                  Etkö ole vielä rekisteröitynyt?
                </span>
                <button className="registerLinkButton" onClick={() => setShowSignUp(true)}>
                  Luo uusi käyttäjä
                </button>
              </div>
            </>
          )}
          {!user && showSignUp && (
            <>
              <SignInForm
                username={newUsername}
                email={newEmail}
                password={newPassword}
                passwordAgain={newPasswordAgain}
                handleUsernameChange={({ target }) => setNewUsername(target.value)}
                handleEmailChange={({ target }) => setNewEmail(target.value)}
                handlePasswordChange={({ target }) => setNewPassword(target.value)}
                handlePasswordAgainChange={({ target }) => setNewPasswordAgain(target.value)}
                handleSubmit={addUser}
              />
              <div className="backToLoginLinkButtonContainer">
                <button className='backToLoginLinkButton' onClick={() => setShowSignUp(false)}>Takaisin kirjautumisikkunaan</button>
              </div>
            </>
          )}
          {user && (
            <div className='loggedInMessageContainer'>
              <p>Käyttäjä <strong style={{ color: '#fff' }}>{user.username}</strong> kirjautunut sisään</p>
              <button className='button' id='logoutButton' onClick={handleLogout}>Kirjaudu ulos</button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserManagement;
