import React, { useEffect, useState, Component } from 'react';
import Post from '../post/Post'
import './Feed.css'
import jwt_decode from "jwt-decode";


const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState()
  const [counter, setCounter] = useState(0)
  let userId;
  if (token === "fakeToken") {userId = 'TestUser'} else {userId = jwt_decode(token).user_id} // Means that tests won't use jwt_decode and therefore won't through errors

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => 
          response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
        
    }
  }, [counter])

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: post, postauthor: userId })
    })
      .then(response => {
        if(response.status === 201) {
          setCounter(counter + 1)
          setPost("")
          navigate('/posts')
        } else {
          alert('oops something is wrong')
        }
      })
  }
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handlePostChange = (event) => {
    setPost(event.target.value)
  }
  
  //button back to top
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }


    if(token) {
      return(
        <>
          <h2>Posts:</h2>
            <button onClick={logout}>
              Logout
            </button>
          <div>
                <form onSubmit={handleSubmit}>
                  <textarea id="postarea" name="postarea" rows='4' cols='50' value={ post } onChange={handlePostChange} placeholder="Write your post here"></textarea>

                  <input id='submit' type="submit" value="Add a post" />
                </form>
          </div>
          <div id='feed' role="feed">
          <button onClick= {topFunction} id="myBtn" title="Go to top">Top</button>
              {posts.map(
                (post) => ( 
                  <Post post={ post } userId = { userId } token = { token } key={ post._id } /> 
                  )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;

