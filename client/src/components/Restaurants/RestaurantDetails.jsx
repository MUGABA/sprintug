import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsById } from "../../Services/restService";

const RestaurantDetails = () => {
  const [details, setDetails] = useState({});

  const { restId } = useParams();

  const getRestDetails = async () => {
    const { data } = await getDetailsById(restId);

    setDetails(data);
  };

  useEffect(() => {
    getRestDetails();
  }, [restId]);

  const {
    name,
    location,
    image,
    createdAt,
    cuisineType,
    // createdBy: { name: creator },
  } = details;
  return (
    <div>
      <div className="res-details">
        <div className="image-part">
          <h3 data-testid="rest-name-id">Restaurant Details </h3>
          <img src={`${process.env.PUBLIC_URL}/uploads/${image}`} alt="image" />
        </div>

        <div className="details-part">
          <div className="detail">
            <p className="label">name:</p>
            <p className="value">{name}</p>
          </div>

          <div className="detail">
            <p className="label">Cuisine Type:</p>
            <p className="value">{cuisineType}</p>
          </div>
          <div className="detail">
            <p className="label">Location:</p>
            <p className="value">{location}</p>
          </div>
          {/* <div className="detail">
          <p className="label">Created By:</p>
          <p className="value">{creator}</p>
        </div> */}
          <div className="detail">
            <p className="label">Created On:</p>
            <p className="value">{createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
