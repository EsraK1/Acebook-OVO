import React, { createElement } from 'react';

const Post = (props) => {

  const date = new Date(props.post.datePosted).toLocaleDateString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    }); 

  const likeBtn = () => {
    if (props.post.likes.includes(props.userId)) {return (<button style={{float: 'right', border: 'none', 'background-color': 'transparent'}} >{props.post.likes.length} likes: You have liked this post</button>)} else {
      return(<button onClick={likeBtnSubmit} style={{float: 'right'}}>{props.post.likes.length} likes: Click here to like this post</button>)
    }
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
  

  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        <h2 className="post-date">{ date }</h2>
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <p >{ props.post.message }</p>
        {likeBtn()}
      </article>
  )
}

export default Post;
