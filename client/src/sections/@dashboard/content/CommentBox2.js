import React from 'react';
import axios from 'axios';
import './CommentBox2.css';
import { fDateTime } from '../../../utils/formatTime';
import { useAuthContext } from '../../../providers/AuthProvider';

export default function CommentBox2(props) {
  const { comments, contentId, addComment } = props;
  const { user } = useAuthContext();

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData }).then()
    const formJson = Object.fromEntries(formData.entries());
    formJson.content_id = contentId;
    formJson.user_id = user.id;
    formJson.user_profile_picture = user.user_profile_picture;
    formJson.username = user.username;
    axios({ method: 'post', data: formJson, url: `/comments/content/${contentId}` }).then((response) => {
      addComment(response.data);
      form.reset();
    });
  }

  const commentDiv = comments.map((comment) => (
    <div className="comments">
      <div className="commentReact">
        <button>
          <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#707277"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#707277"
              d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
            />
          </svg>
        </button>
        <hr />
        <span />
      </div>
      <div className="comment-container">
        <div className="user">
          <div className="user-pic">
            <svg fill="none" viewBox="0 0 24 24" height="60" width="60" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#707277" />
              <image
                href={comment.user_profile_picture}
                x="2"
                y="2"
                height="20"
                width="20"
                preserveAspectRatio="xMidYMid slice"
                clipPath="circle(10px)"
              />
            </svg>
          </div>
          <div className="user-info">
            <span>{comment.username}</span>
            <p>{fDateTime(comment.created_at)}</p>
          </div>
        </div>
        <p className="comment-content">{comment.comment}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="card">
        <span className="title">Comments</span>

        {commentDiv}

        <form method="post" onSubmit={handleSubmit} className="text-box">
          <div className="box-container">
            <textarea placeholder="Reply" name="comment"/>
            <div>
              <div className="formatting">
                <div />
                <div />
                <div />
                <div />
                <div />
                <button type="submit" className="send" title="Send">
                  <svg fill="none" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#ffffff"
                      d="M12 5L12 20"
                    />
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      stroke="#ffffff"
                      d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
