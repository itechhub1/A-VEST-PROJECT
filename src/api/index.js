"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
//@ts-ignore
var nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
var keys = require("../config/keys");
//init transport api key
exports.transporter = nodemailer_1.default.createTransport(nodemailer_sendgrid_transport_1.default({
    auth: {
        api_key: keys.sendGridKEY,
    },
}));
