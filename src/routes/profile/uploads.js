"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadROuter = void 0;
var express_1 = __importDefault(require("express"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var common_1 = require("@localmarket/common");
var uuid_1 = require("uuid");
var router = express_1.default.Router();
exports.fileUploadROuter = router;
var keys = require("../../config/keys");
var S3 = new aws_sdk_1.default.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: "v4",
    region: "us-east-2",
});
router.get("/api/upload", common_1.currentUser, common_1.requireAuth, function (req, res) {
    var _a;
    var extension = req.body.extension;
    var key = ((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id) + "/" + uuid_1.v4() + ".pdf";
    S3.getSignedUrl("putObject", {
        Bucket: "aimartavest",
        ACL: 'public-read',
        Key: key,
    }, function (err, url) {
        if (!err) {
            res.send({ key: key, url: url });
        }
        else {
            throw new Error(err.message);
        }
    });
});
