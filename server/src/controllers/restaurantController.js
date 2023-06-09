import { Router } from "express";
import mongoose from "mongoose";
import upload from "../../multer";
import { ErrorResponse, SuccessResponse } from "../helpers/responseMethods";
import auth from "../middleware/auth";
import Restaurant from "../models/restaurantModel";
import validateRestaurant from "../validations/validateRestaurant";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    return SuccessResponse(
      res,
      200,
      "Restaurants Received successfully",
      restaurants
    );
  } catch (error) {
    return ErrorResponse(
      res,
      500,
      "Server Error! Contact Administration",
      error
    );
  }
});

router.post("/add", [auth, upload.single("image")], async (req, res) => {
  try {
    const { id } = req.user;
    const { restaurantId, name, location, cuisineType } = req.body;

    const filePath = req.file ? req.file.filename : "";

    const { error } = validateRestaurant({ name, location, cuisineType });
    if (error) return ErrorResponse(res, 400, error.details[0].message);

    let restaurant;

    if (restaurantId !== "undefined" && restaurantId) {
      console.log("We reached here");
      const restData = await Restaurant.findById(restaurantId);

      restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
        name,
        location,
        cuisineType,
        image: !filePath.length ? restData.image : filePath,
      });
    } else {
      restaurant = new Restaurant({
        name,
        location,
        cuisineType,
        image: filePath.length ? filePath : "No Image",
        createdBy: id,
      });
      await restaurant.save();
    }

    return SuccessResponse(
      res,
      201,
      "Restaurant Created Successfully",
      restaurant
    );
  } catch (error) {
    console.log(error);
    return ErrorResponse(
      res,
      500,
      "Server Error! Contact Administration",
      error
    );
  }
});

router.get("/get-rest/:restId", async (req, res) => {
  try {
    const { restId } = req.params;

    if (!mongoose.isValidObjectId(restId))
      return ErrorResponse(res, 400, "Invalid Id");

    const restaurant = await Restaurant.findById(restId).populate(
      "createdBy",
      "name"
    );

    if (restaurant === null)
      return ErrorResponse(res, 404, "Restaurant does not exists");

    return SuccessResponse(
      res,
      200,
      "Restaurant Retrieved successfully",
      restaurant
    );
  } catch (error) {
    return ErrorResponse(
      res,
      500,
      "Server Error! Contact Administration",
      error
    );
  }
});

router.delete("/delete-rest/:restId", async (req, res) => {
  try {
    const { restId } = req.params;

    const restaurant = await Restaurant.findById(restId);
    if (restaurant === null)
      return ErrorResponse(res, 400, "Restaurant does not exists");

    await Restaurant.findByIdAndDelete(restId);

    return SuccessResponse(res, 200, "Restaurant deleted successfully", "");
  } catch (error) {
    return ErrorResponse(
      res,
      500,
      "Server Error! Contact Administration",
      error
    );
  }
});

export default router;
