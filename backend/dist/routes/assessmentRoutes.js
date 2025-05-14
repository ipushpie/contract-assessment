"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const assessmentController_1 = require("../controllers/assessmentController");
const router = (0, express_1.Router)();
// All assessment routes are protected
router.use(auth_1.authenticate);
// Assessment routes
router.get("/", assessmentController_1.getAllAssessments);
router.get("/:id", assessmentController_1.getAssessmentById);
router.post("/", (0, auth_1.authorize)(["ADMIN", "REVIEWER"]), assessmentController_1.createAssessment);
router.put("/:id", (0, auth_1.authorize)(["ADMIN", "REVIEWER"]), assessmentController_1.updateAssessment);
router.delete("/:id", (0, auth_1.authorize)(["ADMIN"]), assessmentController_1.deleteAssessment);
// Assessment report routes
router.get("/:id/report", assessmentController_1.generateAssessmentReport);
exports.default = router;
//# sourceMappingURL=assessmentRoutes.js.map