"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const UserController_1 = require("./UserController");
const router = express.Router();
router.post('/register', UserController_1.default.register);
router.post('/login', UserController_1.default.login);
router.get('/users', UserController_1.default.getAll);
router.delete('/users/:id', UserController_1.default.delete);
exports.default = router;
//# sourceMappingURL=router.js.map