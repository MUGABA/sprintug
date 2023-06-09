import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../Services/auhService";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();

    navigate("/");
  };

  return (
    <div className="navBar">
      <div className="links">
        <Link to="/add-restaurant">Add Restaurant</Link>
        <Link to="/view-restaurants">View Restaurants</Link>
      </div>

      <div className="info">
        <span>Hi {user ? user.name : ""}</span>
        <span onClick={handleLogOut}>logout</span>
      </div>
    </div>
  );
};

export default NavBar;
