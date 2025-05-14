"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const contractController_1 = require("../controllers/contractController");
const router = (0, express_1.Router)();
// All contract routes are protected
router.use(auth_1.authenticate);
// Contract routes
router.get("/", contractController_1.getAllContracts);
router.get("/:id", contractController_1.getContractById);
router.post("/", (0, auth_1.authorize)(["ADMIN", "REVIEWER"]), contractController_1.createContract);
router.put("/:id", (0, auth_1.authorize)(["ADMIN", "REVIEWER"]), contractController_1.updateContract);
router.delete("/:id", (0, auth_1.authorize)(["ADMIN"]), contractController_1.deleteContract);
// Product routes
router.get("/:contractId/products", contractController_1.getContractProducts);
router.post("/:contractId/products", (0, auth_1.authorize)(["ADMIN", "REVIEWER"]), contractController_1.addProductToContract);
exports.default = router;
//# sourceMappingURL=contractRoutes.js.map