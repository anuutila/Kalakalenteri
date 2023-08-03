import React, { useState } from "react"

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
     <div>
       <h2>Rekisteröidy</h2>
 
       <div>
         <form className="signUpForm" onSubmit={handleSubmit}>
           <div>
             käyttäjänimi:
             <input
               value={username}
               onChange={handleUsernameChange}
             />
           </div>
           <div>
             sähköposti:
             <input
               value={email}
               onChange={handleEmailChange}
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
         <div>
             toista salasana:
             <input
               type="password"
               value={passwordAgain}
               onChange={handlePasswordAgainChange}
             />
         </div>
           <button className="signUpButton" type="submit">Rekisteröidy</button>
         </form>
       </div>
     </div>
   )
 }
 
 export default SignUpForm