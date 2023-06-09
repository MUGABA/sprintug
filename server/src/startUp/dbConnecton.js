import mongoose from "mongoose";

const connection = () => {
  let uri = "";
  if (process.env.NODE_ENV === "test") uri = process.env.DB_URI_TEST;
  else uri = process.env.DB_URI;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((error) =>
      console.log(
        "Database could not connect. Please your connections or if your mongodb is running locally"
      )
    );
};

export default connection;
