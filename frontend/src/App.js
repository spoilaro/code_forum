import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Post from "./components/Post";
import PreviewList from "./components/PreviewList";
import Login from "./components/Login";

import { get_post_previews } from "./request_handles";

function App() {
  const [previews, setPreviews] = useState([]);
  const [token, setToken] = useState(null);

  const updateToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    const fetch_data = async () => {
      const data = await get_post_previews();
      setPreviews(data);
    };

    fetch_data();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div id="main">
          <Routes>
            <Route path="/" element={<PreviewList posts={previews} />} />
            <Route path="/post" element={<Post token={token} />} />
            <Route
              path="/login"
              element={<Login tokenHandler={updateToken} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
