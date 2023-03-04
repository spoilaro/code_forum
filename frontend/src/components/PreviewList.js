import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

const PreviewList = ({ posts, postHandler }) => {
  const navigate = useNavigate();

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

  return <div id="posts">{previews}</div>;
};

export default PreviewList;
