import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [post, setPost] = useState("Your post text goes here")

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
  }, [posts])

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch( '/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: post })
    })
      .then(response => {
        if(response.status === 201) {
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
  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
          <div>
                <form onSubmit={handleSubmit}>
                  <textarea id="postarea" name="postarea" rows='4' cols='50' value={ post } onChange={handlePostChange}>
                  </textarea>
                  <input id='submit' type="submit" value="Add a post" />
            </form>
          </div>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;