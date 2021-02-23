"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.administrator = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var util_1 = require("../util");
var adminSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    twoFactor: {
        type: Boolean,
        default: false,
        required: true,
    },
    secret: {
        type: String,
        default: undefined,
    },
    role: {
        type: String,
        default: util_1.Role.ADMIN,
        enum: Object.values(util_1.Role),
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            //delete ret.password;
            delete ret.__v;
        },
    },
});
adminSchema.methods.isPasswordCorrect = function (inputPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var password, passwordMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = this.get("password");
                    return [4 /*yield*/, bcrypt_1.default.compare(inputPassword, password)];
                case 1:
                    passwordMatch = _a.sent();
                    return [2 /*return*/, passwordMatch];
            }
        });
    });
};
adminSchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function () {
        var hashing, hashedPassword, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.isModified("password")) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt(12)];
                case 2:
                    hashing = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(this.get("password"), hashing)];
                case 3:
                    hashedPassword = _a.sent();
                    this.set("password", hashedPassword);
                    done();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
adminSchema.statics.build = function (attr) {
    return new adminUser(attr);
};
var adminUser = mongoose_1.default.model("adminUser", adminSchema);
exports.administrator = adminUser;