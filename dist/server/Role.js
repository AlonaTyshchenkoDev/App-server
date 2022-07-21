"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Role = new mongoose_1.default.Schema({
    value: { type: String, unique: true, default: "User" },
});
exports.default = mongoose_1.default.model('Roles', Role);
//# sourceMappingURL=Role.js.map