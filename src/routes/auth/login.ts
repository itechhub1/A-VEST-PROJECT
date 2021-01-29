import express, { Request, Response } from "express";
import { BadRequestError } from "@localmarket/common";
import { user } from "../../models/User";
const key = require("../../../config/keys");
import jwt from "jsonwebtoken";
const router = express.Router();

interface requestHandler extends Request {
  body: { [key: string]: string | undefined };
}

const JWTKEY = key.JWT;

router.post("/api/user/login", async (req: requestHandler, res: Response) => {
  const { email, password } = req.body;
  if (!email) return;
  const User = await user.findOne({ email });
  if (!User) throw new BadRequestError("incorrect email and password");
  if (!password) return;
  const IspasswordCorrect = await User.isPasswordCorrect(password);
  if (!IspasswordCorrect)
    throw new BadRequestError("incorrect email and password");
  //setting up jwt payload
  const payload = jwt.sign(
    {
      id: User.id,
      role: User.role,
    },
    JWTKEY
  );
  //setting up session  and redirect to dashboard here
  req.session!.jwt = payload;

  return res.send(User.role);
});

export { router as AccountLogin };
