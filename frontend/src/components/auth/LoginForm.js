import React, { useState } from 'react';
import './LoginForm.css';
import "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function refreshPage(){ 
    window.location.reload();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      navigate('/posts');
    }
    refreshPage()
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <>
        {/* <h2>Welcome to Acebook</h2>
        <h3>Please login below:</h3> */}
        <br></br>
        <div id="welcome_message">
          &#128512; Makers of friendships &#128512;
        </div>
        
        <br></br>
        <div className='container'>
          <div id="pic"></div>

          <div className='column'>
            <form onSubmit={handleSubmit}>
              <h3> Welcome back!</h3>
              <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
              <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <input className='submit-button' id='submit' type="submit" value="Login" />
              <br></br>
              <p>If you don't have an account <a href="/signup">sign up</a> here.</p>
            </form>
          </div>

        </div>
      </>
    );
}

export default LogInForm;
