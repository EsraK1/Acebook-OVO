import React, { useEffect, useState } from 'react';
import './Post.css';


// changed the input of just 'post' to 'props' which contains all the properties of the Post element in Feed.js
const Post = ( props ) => {
  const date = new Date(props.post.datePosted).toLocaleDateString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    }); 

  const deleteFunction = async (event) => {
    event.preventDefault();
    fetch( '/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ _id: props.post._id })
    })
      .then(response => {
        if(response.status === 201) {
          console.log('OK')
        } else {
          alert('oops something is wrong')
        }
      }).then(refreshPage())
  }

  const likeBtn = () => {
    if (props.post.likes.includes(props.userId)) {return (<button id={'likeButton'} className='like'  >{props.post.likes.length} ♥︎</button>)} else { 
      return(<button id={'likeButton'} onClick={() =>{likeBtnSubmit() ; refreshPage()}} className='like'>{props.post.likes.length} ♥︎</button>)
        
    }
  }


  function refreshPage(){ 
    window.location.reload(); 
  }

  const likeBtnSubmit = async () => { 
      fetch( '/posts', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({ _id: props.post._id, userId: props.userId })
      })
        .then(response => {
          if(response.status === 200) {
            console.log(response)
          } else {
            alert('oops something is wrong')
          }
        })
    }

  const deleteBtnAppears = (() => {if (props.post.postauthor._id===props.userId) {return <button onClick= {deleteFunction} id={"deleteBtn"} title={"Delete post"}>Delete Post</button>}})


  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        <h2 className="post-date">{ date }</h2>
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <p >{ props.post.message }</p>
        {deleteBtnAppears()}
        {likeBtn()}
      </article>
  )
}

// Try adding an unlike feature so the same button can be used to like and unliked by a user
// We need to think about how the user id will be removed from the array for likes when 'unliking'
// maybe try reengineer the '#likeBtnSubmit' above to make it unlike posts

export default Post;
