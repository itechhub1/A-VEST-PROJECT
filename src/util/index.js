"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvesmentStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role = exports.Role || (exports.Role = {}));
var InvesmentStatus;
(function (InvesmentStatus) {
    InvesmentStatus[InvesmentStatus["ACTIVE"] = 0] = "ACTIVE";
    InvesmentStatus[InvesmentStatus["PENDING"] = 1] = "PENDING";
    InvesmentStatus[InvesmentStatus["CANCELED"] = 2] = "CANCELED";
    InvesmentStatus[InvesmentStatus["EXPIRED"] = 3] = "EXPIRED";
})(InvesmentStatus = exports.InvesmentStatus || (exports.InvesmentStatus = {}));
