import bcrypt from "bcrypt";
import { Router } from "express";
import generatePassHash from "../helpers/generatePassHash";
import generateToken from "../helpers/generateToken";
import { ErrorResponse } from "../helpers/responseMethods";
import User from "../models/UsersModel";
import validateUser, { validateUserLogin } from "../validations/userValidation";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { error } = await validateUser(req.body);
    if (error) return ErrorResponse(res, 400, error.details[0].message);

    const isRegistered = await User.findOne({ email: email });
    if (isRegistered !== null)
      return ErrorResponse(res, 400, "User already registered! Try login");

    const passwordHash = await generatePassHash(password);

    const user = new User({ name, email, password: passwordHash });
    await user.save();

    const token = await generateToken(user.id, email);

    return res
      .status(201)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        status: 200,
        data: { id: user.id, name, email },
        token,
      });
  } catch (error) {
    return ErrorResponse(
      res,
      500,
      "Server Error! Contact Administration",
      error
    );
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = await validateUserLogin(req.body);
    if (error) return ErrorResponse(res, 400, error.details[0].message);

    const user = await User.findOne({ email: email });
    if (user === null)
      return ErrorResponse(res, 400, "Wrong email or password");

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword)
      return ErrorResponse(res, 400, "Wrong email or password");

    const token = await generateToken(user.id, email);

    return res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        status: 200,
        data: { id: user.id, name: user.name, email },
        token,
      });
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
