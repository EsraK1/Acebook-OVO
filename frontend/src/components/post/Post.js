import React, { Component } from 'react';


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

  // If the userId matches the postauthor._id, the delete button is shown
  const deleteBtn = (() => {if (props.userId === props.post.postauthor._id) {return <button onClick={deleteBtnClick} style={{float:'right'}}>Delete this post</button>}})

  const deleteBtnClick = async (event) => {
    event.preventDefault();
    fetch( '/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ _id: props.post._id})
    })
      .then(response => console.log(response))
  }



  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        <h2 className="props.-date">{ date }</h2>
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <p>{ props.post.message }</p>
        {deleteBtn()}
      </article>
  )
}

export default Post;
