import React, { Component } from 'react';

const Post = (props) => {

  const date = new Date(props.post.datePosted).toLocaleDateString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    }); 

  const deleteFunction =async (event) => {
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


  const deleteBtnAppears = (() => {if (props.post.postauthor._id===props.user_id) {return <button onClick= {deleteFunction} id={"deleteBtn"} title={"Delete post"}>Delete Post</button>}})

  function refreshPage(){
    window.location.reload();
   }

  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        <h2 className="post-date">{ date }</h2>
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <p >{ props.post.message }</p>
        {deleteBtnAppears()}
      </article>
  )
}

export default Post;
