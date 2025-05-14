"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Public routes
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
// Protected routes
router.get("/profile", auth_1.authenticate, userController_1.getProfile);
router.get("/", auth_1.authenticate, (0, auth_1.authorize)(["ADMIN"]), userController_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map