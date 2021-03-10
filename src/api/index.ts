import nodemailer from "nodemailer";
//@ts-ignore
import sendgridTransport from "nodemailer-sendgrid-transport";
const keys = require("../config/keys");

//init transport api key
export const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendGridKEY,
    },
  })
);
