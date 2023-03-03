import "./App.css";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Post from "./components/Post";
import PostPreview from "./components/PostPreview";

import { get_post_previews } from "./request_handles";

function App() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      const data = await get_post_previews();

      setPreviews(data);

      console.log(data);
    };

    fetch_data();
  }, []);

  const previewList = previews.map((post) => (
    <div key={post.post_id} className="post-preview">
      {post.post_name}
    </div>
  ));

  return (
    <div className="App">
      <Navbar />

      <div id="main">
        <div id="posts">{previewList}</div>
      </div>
    </div>
  );
}

export default App;
