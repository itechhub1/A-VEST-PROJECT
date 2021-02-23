"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
var seeeder_1 = __importDefault(require("../seeeder"));
var keys = require("./keys");
var common_1 = require("@localmarket/common");
mongoose_1.default.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.on("connected", function () {
    seeeder_1.default();
    console.log("connected to mongo instance");
});
mongoose_1.default.connection.on("error", function (err) {
    throw new common_1.ServerResponse("network connection error:Try again Later", 500);
});
