"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.investment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var util_1 = require("../util");
var invesmentSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    percentage: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    roi: {
        type: Number,
        required: true,
    },
    employerCompany: {
        type: String,
        required: true,
    },
    occupationDesc: {
        type: String,
        required: true,
    },
    nextOfKin: {
        type: String,
        required: true,
    },
    addressOfKin: {
        type: String,
        required: true,
    },
    relationshipOfKin: {
        type: String,
        required: true,
    },
    phonenumberOfKin: {
        type: String,
        required: true,
    },
    paymentPlan: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.keys(util_1.InvesmentStatus),
        default: util_1.InvesmentStatus.PENDING,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    paymentRef: {
        type: String,
    },
    termination: {
        type: Boolean,
        default: false,
    },
    investementExpired: {
        type: Boolean,
        default: false,
    },
    expireTime: {
        type: String,
    },
    agreement: {
        type: Boolean,
        required: true,
    },
    cleared: {
        type: Boolean
    },
    monthsLeft: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: { createdAt: true, updatedAt: false } });
invesmentSchema.statics.build = function (attr) {
    return new investment(attr);
};
var investment = mongoose_1.default.model("investment", invesmentSchema);
exports.investment = investment;
