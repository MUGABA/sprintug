import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addRestaurant, getDetailsById } from "../../Services/restService";

const AddRestaurant = () => {
  const [restDetails, setRestDetails] = useState({
    name: "",
    location: "",
    cuisineType: "",
  });

  const { restId } = useParams();

  const getRestDetails = async () => {
    const { data } = await getDetailsById(restId);

    setRestDetails(data);
  };

  useEffect(() => {
    if (restId) {
      getRestDetails();
    }
  }, [restId]);

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const { name, location, cuisineType } = restDetails;

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRestDetails({ ...restDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("location", location);
    formData.append("cuisineType", cuisineType);
    formData.append("restaurantId", restId);
    formData.append("image", image);

    try {
      await addRestaurant(formData);

      navigate("/view-restaurants");
    } catch (error) {}
  };

  return (
    <div className="restaurantContainer">
      <h3>Add Restaurant</h3>
      <form action="" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>

        <div className="input">
          <label htmlFor="">Cuisine Type</label>
          <input
            type="text"
            name="cuisineType"
            value={cuisineType}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <label htmlFor="">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <label htmlFor="">Select Image</label>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>

        <div className="buttonContainer">
          <button>{!restId ? "Add Restaurant" : "Update Restaurant"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
