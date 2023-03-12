import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

const Login = ({ tokenHandler, userHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailChange = (event) => {
    event.preventDefault();

    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    event.preventDefault();

    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    console.log("Logging");
    console.log(data);

    const res = await fetch("http://localhost:3100/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res_data = await res.json();

    if (res_data.success) {
      tokenHandler(res_data.token);

      userHandler(res_data.rows.user_id);

      console.log("LOGIN SUCCESS");
      navigate("/");
    } else {
      console.log("LOGIN FAILED");
    }

    console.log(res_data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input onChange={emailChange} type="text" name="email" value={email} />
        <input
          onChange={passwordChange}
          type="text"
          name="password"
          value={password}
        />
        <input onClick={handleLogin} type="button" name="login" value="Login" />
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
