const Restaurant = ({ item, deleteItem, redirectEdit }) => {
  const { name, location, cuisineType, image, _id: id } = item;

  return (
    <div className="rest-card">
      <div className="buttons">
        <div className="button">
          <button
            onClick={(e) => {
              e.stopPropagation();
              redirectEdit(id);
            }}
          >
            <i class="fa fa-pencil-square-o" aria-hidden="true">
              Edit
            </i>
          </button>
        </div>

        <div className="button">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(id);
            }}
          >
            <i class="fa fa-trash-o" aria-hidden="true">
              Del
            </i>
          </button>
        </div>
      </div>
      <div className="image">
        <img src={`${process.env.PUBLIC_URL}/uploads/${image}`} alt="image" />
      </div>

      <div className="rest-details">
        <span>{name}</span>
        <span>Located at {location}</span>
        <span>Serves {cuisineType}</span>
      </div>
    </div>
  );
};

export default Restaurant;
