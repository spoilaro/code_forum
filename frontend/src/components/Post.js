import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Post = () => {
  const { state } = useLocation();
  const [post, setPost] = useState({});

  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1);
  };

  const likePost = () => {
    const res = fetch("/like", {
      body: {
        id: post.post_id,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/posts/find?id=" + state.id);
      const data = await res.json();

      setPost(data.rows[0]);
    };

    getData();
  }, []);

  return (
    <div>
      <button onClick={navBack}>Back</button>
      <button onClick={likePost}>Like</button>
      <h3>{post.post_name}</h3>
      <p>Likes: {post.likes}</p>
      <p>{post.body}</p>
      <p>{state.id}</p>
    </div>
  );
};

export default Post;
