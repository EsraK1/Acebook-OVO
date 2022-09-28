import React, { useState } from 'react';
import './Post.css'

const Post = (props) => {

  const [comment, setComment] = useState();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const avatarDisplay = () => {
    if (props.post.postauthor.img === "") { return (
      <img src="https://img.freepik.com/premium-vector/cute-duck-egg-cartoon-mascot-logo-design_92637-190.jpg" alt="Default avatar duck"/>)
    } else {return (<img src={props.post.postauthor.img} alt="User's avatar"/>)}
  }

  // see puts 
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  // see puts
  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch( '/posts/comment/', {
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
      .then(() => {props.counterChanger(prevState => ({count: prevState.counter + 1}))})
  }

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
      }).then(() => {props.counterChanger(prevState => ({count: prevState.counter + 1}))})
  }

  const likeBtn = () => {
    if (props.post.likes.includes(props.userId)) {return (<button id={'likeButton'} className='like' onClick={() =>{removeLikeBtnSubmit()}}  >{props.post.likes.length} ♥︎</button>)} else { 
      return(<button id={'likeButton'} onClick={() =>{likeBtnSubmit()}} className='like'>{props.post.likes.length} ♥︎</button>)
        
    }
  }


  const likeBtnSubmit = async () => { 
      fetch( '/posts/like/', {
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
        .then(() => {props.counterChanger(prevState => ({count: prevState.counter + 1}))})
    }

    const removeLikeBtnSubmit = async () => { 
      fetch( '/posts/RemoveLike/', {
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
        .then(() => {props.counterChanger(prevState => ({count: prevState.counter + 1}))})
    }

  const deleteBtnAppears = (() => {if (props.post.postauthor._id===props.userId) {return <button onClick= {deleteFunction} className={"like"} id={"deleteBtn"} title={"Delete post"}>Delete Post</button>}})


    function commentList(){
      if(props.post.comments.length > 0) { 
        let comment = props.post.comments.map((element, index) => (
          <>
              <p className="commentPara" key={ element.user_id + props.post._id + index }>
              "{ element.user_comment }"
              </p> 
          </>
      ))
      return comment 
      }
    }

    const showCommentFormBtnHandle = () => {
      setShowCommentForm(current => !current)
    }
    const showHideCommentFormBtn = () => {
      if (showCommentForm) {
        return(<button onClick={() => showCommentFormBtnHandle()}>Hide the comment entry form</button>)
      } else {
        return(<button onClick={() => showCommentFormBtnHandle()}>Write a comment!</button>)
      }
    }


    // {posts.map(
    //   (post) => ( <Post post={ post } key={ post._id } userId={ userId } token={ token } /> )
    // )}
  return(
      <article data-cy="post" className='post' key={ props.post._id }>
        {avatarDisplay()}
        <h2 className="post-author">{ props.post.postauthor.username }</h2>
        <h2 className="post-date">{ date }</h2>
        <p >{ props.post.message }</p>
        {deleteBtnAppears()}
        {likeBtn()}
        {showHideCommentFormBtn()}
          <form onSubmit={handleSubmit} style={{display: showCommentForm ? 'block' : 'none'}}>
            <textarea id="postarea" name="postarea" rows='4' cols='50' value={ comment } onChange={handleCommentChange} placeholder="Write your comment here"></textarea>
            <input id='submit' type="submit" value="Add a post" />
          </form>
        <div className="commentDiv">
          { commentList() }
        </div>

      </article>
  )
}

// Try adding an unlike feature so the same button can be used to like and unliked by a user
// We need to think about how the user id will be removed from the array for likes when 'unliking'
// maybe try reengineer the '#likeBtnSubmit' above to make it unlike posts

export default Post;





