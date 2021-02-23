"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var common_1 = require("@localmarket/common");
require("./config/database");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = require("body-parser");
require("express-async-errors");
var path_1 = __importDefault(require("path"));
var root__route_1 = require("./root__route");
require("./sheduler");
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.set("trust-proxy", true);
app.use(cors_1.default());
app.use(body_parser_1.json());
//*view template engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(cookie_session_1.default({
    secure: false,
    signed: false,
}));
app.get("/docs", function (req, res) {
    res.send("<h2>Aimart API ENDPOINTS Documentations</h2>");
});
root__route_1.rootRoute(app);
//serve static asset in production
if (process.env.NODE_ENV === "production") {
    //server asset
    app.use(express_1.default.static("client/build"));
    app.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.all("*", function () {
    throw new common_1.NotFoundError();
});
app.use(common_1.errorHandler);
app.listen(PORT, function () { return console.log("server has started on port " + PORT); });
