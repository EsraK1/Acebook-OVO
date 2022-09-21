import React from 'react';

const Post = ({post}) => {
  return(
      <article data-cy="post" key={ post._id }>
        <h2>{ post.datePosted }</h2>
        <p>{ post.message }</p>
      </article>
  )
}

export default Post;
