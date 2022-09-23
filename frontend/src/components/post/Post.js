import React from 'react';

const Post = ({post}) => {

  const date = new Date(post.datePosted).toLocaleDateString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    }); 

  return(
      <article data-cy="post" className='post' key={ post._id }>
        <h2 className="post-date">{ date }</h2>
        <h2 className="post-author">{ post.postauthor.username }</h2>
        <p >{ post.message }</p>
      </article>
  )
}

export default Post;
