import React, { useEffect, useState } from 'react';

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

  const likeBtn = () => {
    if (props.post.likes.includes(props.userId)) {return (<button id={'likeButton'} style={{float: 'right', border: 'none', 'background-color': 'transparent'}} >{props.post.likes.length} likes: You have liked this post</button>)} else {
        return(<button id={'likeButton'} onClick={() =>{likeBtnSubmit() ; refreshPage()}} style={{float: 'right'}}>{props.post.likes.length} likes: Click here to like this post</button>)
    }
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
}


// Try adding an unlike feature so the same button can be used to like and unliked by a user
// We need to think about how the user id will be removed from the array for likes when 'unliking'
// maybe try reengineer the '#likeBtnSubmit' above to make it unlike posts

export default Post;