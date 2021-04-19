import express, { Request, Response } from "express";
import Aws from "aws-sdk";
import { currentUser, requireAuth } from "@localmarket/common";
import { v4 as uuidV4 } from "uuid";

const router = express.Router();

const keys = require("../../config/keys");

const S3 = new Aws.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: "v4",
  region: "us-east-2",
});

router.get(
  "/api/upload",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    const { extension } = req.body;
    const key = `${req.currentUser?.id}/${uuidV4()}.pdf`;
    S3.getSignedUrl(
      
      "putObject",
      {
        Bucket: "aimartavest",
        ACL: 'public-read',
        Key: key,
      },
      (err, url) => {
        if (!err) {
          res.send({ key, url });
        } else {
          throw new Error(err.message);
        }
      }
    );
  }
);

export { router as fileUploadROuter };
