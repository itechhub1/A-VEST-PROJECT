import express, { Request, Response } from "express";
import speakeasy from "speakeasy";
import { administrator } from "../../../models/admin";
const key = require('../../../config/keys')

import jwt from "jsonwebtoken";
import {
  BadRequestError
} from "@localmarket/common";
import { Role } from "./../../../util";

const router = express.Router();

router.post("/api/admin/2FA", async (req, res) => {
  const { token, adminId } = req.body;

  if(!token) throw new BadRequestError('token invalid')

  const _adminUser = await administrator.findById(adminId);
  if (!_adminUser) throw new BadRequestError("Admin Not Found");

  // Use verify() to check the token against the secret
  var verified = speakeasy.totp.verify({
    secret: _adminUser.secret,
    encoding: "base32",
    window: 1,
    token,
  });

  /* check id verified if not detach cookie session from header */
  if (!verified) {
    req.session = null;
    throw new BadRequestError("UnAuthorized Error");
  }

  /* creating session  */
  const JWT = jwt.sign(
    {
      id: _adminUser.id,
      role: _adminUser.role,
    },
    key.JWTKEY
  );
  /* adding to session */
  req.session!.jwt = JWT;

  res.send(_adminUser.role);
});

export { router as twoFactorVerify };
