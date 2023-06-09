import cors from "cors";
import express from "express";
import helmet from "helmet";

import authRouter from "../controllers/authController";
import restaurantRouter from "../controllers/restaurantController";

const start = (app) => {
  app.use(cors());
  app.use(helmet());

  app.use(express.json({ extended: true, limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/", (req, res) => {
    return res.send({ message: "Hello, world!" });
  });

  app.use("/auth", authRouter);
  app.use("/rest", restaurantRouter);
};
export default start;
