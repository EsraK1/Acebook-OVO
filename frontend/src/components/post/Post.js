import React, { useEffect, useState } from 'react';

const Post = (props) => {

  const [comment, setComment] = useState();

  // see puts 
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  // see puts
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch( '/posts', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ _id: props.post._id, user_id: props.userId, user_comment: comment })
    })
      .then(response => {
        if(response.status === 200) {
          console.log("received response")
        } else {
          alert('oops something is wrong')
        }
      })
  }

  const date = new Date(props.post.datePosted).toLocaleDateString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    }); 


    function commentList(){
      if(props.post.comments.length > 0) {
        let john = props.post.comments.map((element, index) => (
          <p key={ element.user_id + props.post._id + index }>
           { element.user_comment }
          </p>
      ))
      return john 
      }
    }

    // {posts.map(
    //   (post) => ( <Post post={ post } key={ post._id } userId={ userId } token={ token } /> )
    // )}
  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        <h2 className="post-date">{ date }</h2>
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <p >{ props.post.message }</p>

        <form onSubmit={handleSubmit}>
          <textarea id="postarea" name="postarea" rows='4' cols='50' value={ comment } onChange={handleCommentChange} placeholder="Write your comment here"></textarea>
          <input id='submit' type="submit" value="Add a post" />
        </form>

        { commentList() }

      </article>
  )
}






export default Post;





