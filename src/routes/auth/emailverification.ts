import express, { Request, Response } from "express";
import { BadRequestError } from "@localmarket/common";
import { user } from "../../models/User";

const router = express.Router();

router.get("/api/user/verifyemail/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  
  /* make query to database */
  let isValidToken = await user.findOne({ token: id.toString() });
  console.log(isValidToken);
  if (!isValidToken) return res.render('failureVerification',{
    path: "/login",
    message: "verification failed ",
    status: { success: false },
  })

  isValidToken.set({
    token: undefined,
    emailVerified: true,
  });

  await isValidToken.save();

  return res.render('successVerification',{
    path: "/login",
    message: "verification successfull ",
    status: { success: false },
  });
});
export { router as EmailVerification };
