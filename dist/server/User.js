"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Role_1 = require("./Role");
const User = new mongoose_1.default.Schema({
    login: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: [{ type: String, ref: Role_1.default }]
});
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=User.js.map