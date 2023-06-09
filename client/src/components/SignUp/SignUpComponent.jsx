import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../Services/auhService";

const UserSignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const message = useRef("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length || !password.length) return;
    try {
      await authorize("/auth", { name, email, password });

      navigate("/view-restaurants");
    } catch (error) {}
  };

  const { email, name, password } = user;

  return (
    <div className="formContainer">
      <form action="" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="">Full Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>

        <div className="input">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="buttonContainer">
          <button>Sign Up</button>
        </div>
      </form>

      <div className="footer">
        <span>
          I already have an account <Link to="/">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default UserSignUp;
