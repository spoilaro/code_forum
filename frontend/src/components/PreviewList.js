import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

const PreviewList = ({ posts, postHandler, user }) => {
  const navigate = useNavigate();

  console.log("THIS IS USER: " + user);

  const openPost = (event) => {
    const id = event.target.id;
    navigate("post", { state: { id } });
  };

  const previews = posts.map((post) => (
    <div
      onClick={openPost}
      key={post.post_id}
      className="post-preview"
      id={post.post_id}
    >
      {post.post_name}
    </div>
  ));

  return (
    <div id="posts">
      <NewPost user={user} />
      {previews}
    </div>
  );
};

const NewPost = ({ user }) => {
  const [post, setPost] = useState({ user_id: user, name: "", body: "" });

  console.log(post);

  const changePost = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const createNewPost = async () => {
    console.log(post);
    const res = await fetch("http://localhost:3100/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div>
      <h3>Create a new post</h3>
      <input
        onChange={changePost}
        type="text"
        name="name"
        value={post.name}
      ></input>
      <input
        onChange={changePost}
        type="text"
        name="body"
        value={post.body}
      ></input>
      <input
        onClick={createNewPost}
        type="button"
        name="post"
        value="Post"
      ></input>
    </div>
  );
};

export default PreviewList;
