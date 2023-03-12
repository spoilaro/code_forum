import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

const Register = () => {
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

    console.log("Registering");
    console.log(data);

    const res = await fetch("http://localhost:3100/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res_data = await res.json();

    if (res_data.status) {
      console.log("REGISTER SUCCESS");
      navigate("/login");
    } else {
      console.log("REGISTER FAILED");
    }

    console.log(res_data);
  };

  return (
    <div>
      <h1>Register</h1>
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
    </div>
  );
};

export default Register;
