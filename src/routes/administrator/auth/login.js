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
exports.AdministratorLogin = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var admin_1 = require("../../../models/admin");
var api_1 = require("../../../api");
var _2FAtemplate_1 = require("../../../template/2FAtemplate");
var speakeasy_1 = __importDefault(require("speakeasy"));
var common_1 = require("@localmarket/common");
var router = express_1.default.Router();
exports.AdministratorLogin = router;
router.post("/api/admin-login", [
    express_validator_1.body("email").not().isEmpty().withMessage("Email feild is required"),
    express_validator_1.body("username").not().isEmpty().withMessage("Username field is empty"),
    express_validator_1.body("password").not().isEmpty().withMessage("password field is empty"),
], common_1.ValidationResult, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var secret, _a, username, password, email, adminUser, isPasswordCorrect;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                secret = speakeasy_1.default.generateSecret({ length: 20 });
                _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                return [4 /*yield*/, admin_1.administrator.findOne({ username: username })];
            case 1:
                adminUser = _b.sent();
                if (!adminUser)
                    throw new common_1.BadRequestError(" UnAuthorize Access");
                if (adminUser.email !== email)
                    throw new common_1.BadRequestError(" UnAuthorize Access");
                return [4 /*yield*/, adminUser.isPasswordCorrect(password)];
            case 2:
                isPasswordCorrect = _b.sent();
                if (!isPasswordCorrect)
                    throw new common_1.BadRequestError("  UnAuthorize Access");
                /* checking if 2FA is activated  and return early*/
                if (adminUser.twoFactor) {
                    return [2 /*return*/, res.send({ is2FA: adminUser.twoFactor, id: adminUser._id })];
                }
                /* adding secret to administrative DB for first login and set 2FA true */
                adminUser.set({
                    secret: secret.base32,
                    twoFactor: true,
                });
                return [4 /*yield*/, adminUser.save()];
            case 3:
                _b.sent();
                /* sending 2FA secret via email verification to client using sendgrid Email */
                return [2 /*return*/, api_1.transporter.sendMail({
                        to: "" + email,
                        from: "aimartrealtor@gmail.com",
                        subject: "One Time Access",
                        html: _2FAtemplate_1.TwoFATemplate(secret.base32),
                    }, function (err) {
                        if (!err) {
                            return res.send("Initial login successfull: Follow the instructions in your mail");
                        }
                        console.log("sendMail", err);
                        //throw new Error(err.message);
                    })];
        }
    });
}); });
