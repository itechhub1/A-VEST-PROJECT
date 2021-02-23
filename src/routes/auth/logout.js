"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountLogout = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.AccountLogout = router;
router.get("/api/user/logout", function (req, res) {
    req.session = null;
    return res.send("successfully logout: see you soon!");
    //res.redirect("/login");
});
