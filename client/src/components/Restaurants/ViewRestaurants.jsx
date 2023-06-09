import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRestById, getRestaurants } from "../../Services/restService";
import Restaurant from "./RestaurantCard";

const ViewRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    const { data } = await getRestaurants();

    setRestaurants(data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleRedirect = (item) => {
    navigate(`/view-details/${item._id}`);
  };

  const handleRedirectToEdit = (id) => {
    navigate(`/update-restaurant/${id}`);
  };

  const handleDeleteRest = async (id) => {
    try {
      const newList = restaurants.filter((item) => item._id !== id);

      setRestaurants(newList);

      await deleteRestById(id);
    } catch (error) {}
  };

  return (
    <div className="rest-container">
      {restaurants.length === 0 ? (
        <div>No restaurants yet</div>
      ) : (
        <>
          {restaurants.map((item, idx) => (
            <div
              key={idx}
              className="rest"
              onClick={() => {
                handleRedirect(item);
              }}
            >
              <Restaurant
                item={item}
                deleteItem={handleDeleteRest}
                redirectEdit={handleRedirectToEdit}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ViewRestaurants;
