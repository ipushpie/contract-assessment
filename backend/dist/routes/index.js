"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const contractRoutes_1 = __importDefault(require("./contractRoutes"));
const assessmentRoutes_1 = __importDefault(require("./assessmentRoutes"));
const router = (0, express_1.Router)();
router.use('/users', userRoutes_1.default);
router.use('/contracts', contractRoutes_1.default);
router.use('/assessments', assessmentRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map