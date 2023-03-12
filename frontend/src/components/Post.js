import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Post = ({ token }) => {
  const { state } = useLocation();
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentField, setCommentField] = useState("");

  const [updatePost, setUpdatePost] = useState(false);

  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1);
  };

  const likePost = async () => {
    const res = await fetch("/posts/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post.post_id,
      }),
    });

    const data = await res.json();

    if (data.msg === "SUCCESS") {
      setLikes(likes + 1);
    }
  };

  const commentHandler = (event) => {
    event.preventDefault();

    setCommentField(event.target.value);
  };

  const postComment = async () => {
    const res = await fetch("/comments/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post_id: post.post_id,
        user_id: 1, // FIXME: Set this to current user
        body: commentField,
      }),
    });

    const data = await res.json();

    if (data.msg === "SUCCESS") {
      console.log("COMMENT INSERTED");

      setUpdatePost(!updatePost);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/posts/find?id=" + state.id);
      const data = await res.json();

      setPost(data.rows[0]);
    };

    const getComments = async () => {
      const res = await fetch("/comments/list?id=" + state.id);

      const data = await res.json();

      console.log(data.rows);

      setComments(data.rows);
    };

    getData();
    getComments();
  }, [likes, updatePost]);

  return (
    <div>
      <button onClick={navBack}>Back</button>
      {token ? <button onClick={likePost}>Like</button> : ""}
      <h3>{post.post_name}</h3>
      <p>Likes: {post.likes}</p>
      <p>{post.body}</p>
      <p>{state.id}</p>

      <div id="comment-section">
        {token ? (
          <input
            type="text"
            name="comment-field"
            onChange={commentHandler}
            value={commentField}
          ></input>
        ) : (
          ""
        )}
        {token ? (
          <button onClick={postComment} type="button">
            Post Comment
          </button>
        ) : (
          ""
        )}

        <CommentList comments={comments} />
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  const commentElems = comments.map((elem) => (
    <li id="comment" key={elem.comment_id}>
      {elem.body}
    </li>
  ));

  return <ul id="comment-container">{commentElems}</ul>;
};

export default Post;
