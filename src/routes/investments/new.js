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
exports.NewInvestment = void 0;
var express_1 = __importDefault(require("express"));
var Investments_1 = require("../../models/Investments");
var common_1 = require("@localmarket/common");
var moment_1 = __importDefault(require("moment"));
var util_1 = require("../../util");
var router = express_1.default();
exports.NewInvestment = router;
/*
plan(pin):"Platinum Executive"
percentage(pin):"35% 18months"
amount(pin):"5000000"
roi(pin):"₦6,750,000"
fullname(pin):"Owoeye Oluwatosin Ajibola"
email(pin):"tohshine@gmail.com"
phonenumber(pin):"8060516515"
identity(pin):"International Passport"
employerCompany(pin):"eee"
occupationDesc(pin):"eeee"
nameOfKin(pin):"d"
addressOfKin(pin):"ddd"
phonenumberOfKin(pin):"ddd"
relationshipOfKin(pin):"ddd"
agreement(pin):true
paymentPlan(pin):"paystack" */
/*

plan(pin):"Gold Basic"
percentage(pin):"10% 6months"
amount(pin):"1000000"
roi(pin):"₦1,100,000"
fullname(pin):"Owoeye Oluwatosin Ajibola"
email(pin):"tohshine@gmail.com"
phonenumber(pin):"8060516515"
identity(pin):"National ID"
employerCompany(pin):"eee"
occupationDesc(pin):"eeee"
nameOfKin(pin):"akin"
addressOfKin(pin):"kpk50"
phonenumberOfKin(pin):"0923474"
relationshipOfKin(pin):"married"
agreement(pin):true
paymentPlan(pin):"paystack"

*/
/*
"expireTime":"2021-08-02",
 "addressOfKin":"KPK",
 "amount": 5000000,
 "relationshipOfKin":"single",
 "paymentPlan":"paystack",
 "phonenumber":"08138385529",
 "plan":"Gold basic",
 "identity":"volters card",
 "userId":"6019754ebfbd3d41d65a26af",
 "employerCompany":"Hi tech hub",
 "agreement":true,
 "occupationDesc":"programming school",
 "phonenumberOfKin":"0813997227",
 "roi": 65000000,
 "nextOfKin":"akin",
 "percentage":"10% 12months"

*/
var extractNumbOfMonths = function (percentage) {
    /* geting interger 18 from  35% 18months */
    return parseInt(percentage.split(" ")[1].split("m")[0]);
};
router.post("/api/investment/new", common_1.currentUser, common_1.requireAuth, common_1.roleBased([util_1.Role.USER]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var futureExpirationDate, _a, plan, percentage, amount, roi, fullname, email, phonenumber, employerCompany, occupationDesc, nextOfKin, addressOfKin, phonenumberOfKin, relationshipOfKin, agreement, paymentPlan, NewInvestment;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, plan = _a.plan, percentage = _a.percentage, amount = _a.amount, roi = _a.roi, fullname = _a.fullname, email = _a.email, phonenumber = _a.phonenumber, employerCompany = _a.employerCompany, occupationDesc = _a.occupationDesc, nextOfKin = _a.nextOfKin, addressOfKin = _a.addressOfKin, phonenumberOfKin = _a.phonenumberOfKin, relationshipOfKin = _a.relationshipOfKin, agreement = _a.agreement, paymentPlan = _a.paymentPlan;
                if (!req.body)
                    throw new common_1.BadRequestError('input cannot be empty');
                if (!(percentage &&
                    relationshipOfKin &&
                    plan &&
                    amount &&
                    roi &&
                    fullname &&
                    email &&
                    phonenumber &&
                    employerCompany &&
                    occupationDesc &&
                    nextOfKin &&
                    addressOfKin &&
                    phonenumberOfKin &&
                    agreement &&
                    paymentPlan)) return [3 /*break*/, 2];
                futureExpirationDate = moment_1.default().add(extractNumbOfMonths(percentage), "months");
                NewInvestment = Investments_1.investment.build({
                    addressOfKin: addressOfKin,
                    agreement: true,
                    amount: parseInt(amount),
                    email: email,
                    fullname: fullname,
                    expireTime: futureExpirationDate,
                    relationshipOfKin: relationshipOfKin,
                    paymentPlan: paymentPlan,
                    phonenumber: phonenumber,
                    plan: plan,
                    userId: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                    employerCompany: employerCompany,
                    occupationDesc: occupationDesc,
                    phonenumberOfKin: phonenumberOfKin,
                    roi: parseInt(roi),
                    nextOfKin: nextOfKin,
                    percentage: percentage,
                });
                return [4 /*yield*/, NewInvestment.save()];
            case 1:
                _c.sent();
                res.send("Form submitted succesfully!!");
                return [3 /*break*/, 3];
            case 2: throw new common_1.BadRequestError('input cannot be empty');
            case 3: return [2 /*return*/];
        }
    });
}); });
