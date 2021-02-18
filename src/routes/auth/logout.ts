import express from "express";

const router = express.Router();

router.get("/api/user/logout", (req, res) => {
  req.session = null;

  return res.send("successfully logout: see you soon!");

  //res.redirect("/login");
});

export { router as AccountLogout };
