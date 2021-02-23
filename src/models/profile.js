"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var database_1 = require("../config/database");
var profileSchma = new mongoose_1.default.Schema({
    _id: {
        type: database_1.mongoose.Schema.Types.ObjectId,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    identity: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false },
});
profileSchma.statics.build = function (attr) {
    return new profile(attr);
};
var profile = mongoose_1.default.model("profile", profileSchma);
exports.profile = profile;
