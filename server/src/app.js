import "dotenv/config";
import express from "express";
import connection from "./startUp/dbConnecton.js";
import start from "./startUp/start.js";

const app = express();

start(app);
connection();

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`App is running at port ${port}`)
);

export default server;
