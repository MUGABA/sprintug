// import { Switch } from "react-router";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserLogin from "./Login/LoginComponent";
import AddRestaurant from "./Restaurants/AddRestaurant";
import RestaurantDetails from "./Restaurants/RestaurantDetails";
import ViewRestaurants from "./Restaurants/ViewRestaurants";
import UserSignUp from "./SignUp/SignUpComponent";
import NavBar from "./navs/NavBar";
const HomeComponent = () => {
  const [user, setUser] = useState(null);

  const userDetail = localStorage.getItem("user");
  const location = useLocation();

  useEffect(() => {
    setUser(userDetail);
  }, [location]);

  return (
    <div>
      {user ? <NavBar /> : ""}
      <Routes>
        <Route path="/" element={<UserLogin />} />

        <Route path="/register" element={<UserSignUp />} />

        <Route path="/view-restaurants" element={<ViewRestaurants />} />

        <Route path="/view-details/:restId" element={<RestaurantDetails />} />

        <Route path="/add-restaurant" element={<AddRestaurant />} />

        <Route path="/update-restaurant/:restId" element={<AddRestaurant />} />
      </Routes>
    </div>
  );
};

export default HomeComponent;
