import React, { useState } from 'react';
import './SignUpForm.css'

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [img, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    if (regEx.test(email)){
      fetch( '/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, username: username, img: img})
      })
        .then(response => {
          if(response.status === 201) {
            navigate('/login')
          } else {
            navigate('/signup')
          }
        })
    } else if(!regEx.test(email) && email !== ""){
      alert("The given email is not correctly formatted - please try again.")
      return;
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleImgChange = (event) => {
    setImage(event.target.value)
  }

    return (

      <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <br />
          <p>Sign Up</p>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} required />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} minLength="7" required/>
          <input placeholder="Name" id="username" type='text' value={ username } onChange={handleUsernameChange} required/>
          <input placeholder="Avatar URL" id="img" type='url' value={ img } onChange={handleImgChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
      </div>
    );
}

export default SignUpForm;
