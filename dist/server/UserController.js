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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Role_1 = require("./Role");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, secret, { expiresIn: "2h" });
};
class RegisterController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, email, password } = req.body;
                const emailCandidate = yield User_1.default.findOne({ email });
                const loginCandidate = yield User_1.default.findOne({ login });
                if (emailCandidate) {
                    return res.status(400).json({ message: `Email ${email} is also registered` });
                }
                else if (loginCandidate) {
                    return res.status(400).json({ message: `Login ${login} is also registered` });
                }
                const hashedPass = bcrypt.hashSync(password, 7);
                const userRole = yield Role_1.default.findOne({ value: "User" });
                const user = new User_1.default({ login, email, password: hashedPass, role: [userRole === null || userRole === void 0 ? void 0 : userRole.value] });
                yield user.save();
                return res.json({ message: 'Success registration', user });
            }
            catch (e) {
                res.status(400).json({ message: 'Registration error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, email, password } = req.body;
                const user = yield User_1.default.findOne({ login, email });
                if (!user) {
                    res.status(400).json({ message: `Invalid email or login` });
                }
                const validPassword = bcrypt.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
                if (!validPassword) {
                    res.status(400).json({ message: `Invalid password` });
                }
                const token = generateAccessToken(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
                return res.json({ token, user });
            }
            catch (e) {
                res.status(400).json({ message: 'Login error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: 'No such id' });
                }
                const user = yield User_1.default.findById(id);
                return res.json(user);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                res.json(users);
            }
            catch (e) {
                res.status(500).json(e);
            }
        });
    }
}
exports.default = new RegisterController();
//# sourceMappingURL=UserController.js.map