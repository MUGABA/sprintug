import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../Services/auhService";

const UserLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const currentUser = localStorage.getItem("user");

  const message = useRef("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/view-restaurants");
    }
  });

  const handleChange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.length || !password.length) return;
    try {
      await authorize("/auth/login", { email, password });

      navigate("/view-restaurants");
    } catch (error) {}
  };

  const { email, password } = user;

  return (
    <div className="formContainer">
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="buttonContainer">
          <button>Login</button>
        </div>
      </form>

      <div className="footer">
        <span data-testid="sign-up-text">
          I don't have an account <Link to="/register">Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default UserLogin;
