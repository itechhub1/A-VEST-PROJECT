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
var node_cron_1 = __importDefault(require("node-cron"));
var moment_1 = __importDefault(require("moment"));
var Investments_1 = require("./models/Investments");
var util_1 = require("./util");
moment_1.default().format("DD-MM-YYYY");
/* running every min  and make update*/
node_cron_1.default.schedule("* * * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
    var investment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Am runing every min");
                return [4 /*yield*/, Investments_1.investment.find()];
            case 1:
                investment = _a.sent();
                if (!investment)
                    return [2 /*return*/];
                investment.map(function (invest) { return __awaiter(void 0, void 0, void 0, function () {
                    var investmentExpire;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                investmentExpire = moment_1.default(invest.expireTime, "DD-MM-YYYY");
                                if (investmentExpire.diff(moment_1.default(), "days") === 30) {
                                    /* alert  the investor by email for information for extending or termination */
                                }
                                if (!(investmentExpire.diff(moment_1.default(), "days") === 0 && invest.payment)) return [3 /*break*/, 2];
                                /* terminate investement for that particular investor and email the investor */
                                invest.set({
                                    status: util_1.InvesmentStatus.EXPIRED,
                                });
                                return [4 /*yield*/, invest.save()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
/* running every month end */
node_cron_1.default.schedule("0 0 28 * * ", function () { return __awaiter(void 0, void 0, void 0, function () {
    var investement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("am running every month end");
                return [4 /*yield*/, Investments_1.investment.find()];
            case 1:
                investement = _a.sent();
                if (!investement)
                    return [2 /*return*/];
                investement.map(function (invest) { return __awaiter(void 0, void 0, void 0, function () {
                    var dates, monthsLeft, singleInvestemnt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(!invest.termination && !invest.expireTime)) return [3 /*break*/, 3];
                                dates = moment_1.default(invest.expireTime, "DD-MM-YYYY");
                                monthsLeft = dates.diff(moment_1.default(), "months");
                                return [4 /*yield*/, Investments_1.investment.findById(invest.id)];
                            case 1:
                                singleInvestemnt = _a.sent();
                                singleInvestemnt === null || singleInvestemnt === void 0 ? void 0 : singleInvestemnt.set({
                                    monthsLeft: monthsLeft,
                                });
                                return [4 /*yield*/, (singleInvestemnt === null || singleInvestemnt === void 0 ? void 0 : singleInvestemnt.save())];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
