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
exports.addProductToContract = exports.getContractProducts = exports.deleteContract = exports.updateContract = exports.createContract = exports.getContractById = exports.getAllContracts = void 0;
const index_1 = require("../index");
// Get all contracts
const getAllContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contracts = yield index_1.prisma.contract.findMany({
            include: {
                products: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.json(contracts);
    }
    catch (error) {
        console.error('Get all contracts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllContracts = getAllContracts;
// Get contract by ID
const getContractById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contract = yield index_1.prisma.contract.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        usageData: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                assessments: true
            }
        });
        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        res.json(contract);
    }
    catch (error) {
        console.error('Get contract by ID error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getContractById = getContractById;
// Create contract
const createContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, vendorName, contractNumber, startDate, endDate, annualValue, totalValue, duration, terminationNotice, autoRenewal, customerDefinition, geographicLimits, auditObligations, documentUrl, products } = req.body;
        const contract = yield index_1.prisma.contract.create({
            data: {
                name,
                vendorName,
                contractNumber,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                annualValue: parseFloat(annualValue),
                totalValue: parseFloat(totalValue),
                duration: parseInt(duration),
                terminationNotice: terminationNotice ? parseInt(terminationNotice) : null,
                autoRenewal: Boolean(autoRenewal),
                customerDefinition,
                geographicLimits,
                auditObligations,
                documentUrl,
                createdById: req.user.id,
                products: {
                    create: (products === null || products === void 0 ? void 0 : products.map((product) => ({
                        name: product.name,
                        quantity: parseInt(product.quantity),
                        unitPrice: parseFloat(product.unitPrice),
                        discount: product.discount ? parseFloat(product.discount) : null,
                        totalPrice: parseFloat(product.totalPrice)
                    }))) || []
                }
            },
            include: {
                products: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.status(201).json({
            message: 'Contract created successfully',
            contract
        });
    }
    catch (error) {
        console.error('Create contract error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createContract = createContract;
// Update contract
const updateContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, vendorName, contractNumber, startDate, endDate, annualValue, totalValue, duration, terminationNotice, autoRenewal, customerDefinition, geographicLimits, auditObligations, documentUrl } = req.body;
        // Check if contract exists
        const existingContract = yield index_1.prisma.contract.findUnique({
            where: { id }
        });
        if (!existingContract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        // Update contract
        const updatedContract = yield index_1.prisma.contract.update({
            where: { id },
            data: {
                name,
                vendorName,
                contractNumber,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                annualValue: annualValue ? parseFloat(annualValue) : undefined,
                totalValue: totalValue ? parseFloat(totalValue) : undefined,
                duration: duration ? parseInt(duration) : undefined,
                terminationNotice: terminationNotice ? parseInt(terminationNotice) : null,
                autoRenewal: autoRenewal !== undefined ? Boolean(autoRenewal) : undefined,
                customerDefinition,
                geographicLimits,
                auditObligations,
                documentUrl
            },
            include: {
                products: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.json({
            message: 'Contract updated successfully',
            contract: updatedContract
        });
    }
    catch (error) {
        console.error('Update contract error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateContract = updateContract;
// Delete contract
const deleteContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if contract exists
        const existingContract = yield index_1.prisma.contract.findUnique({
            where: { id }
        });
        if (!existingContract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        // Delete contract
        yield index_1.prisma.contract.delete({
            where: { id }
        });
        res.json({ message: 'Contract deleted successfully' });
    }
    catch (error) {
        console.error('Delete contract error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteContract = deleteContract;
// Get products for a contract
const getContractProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const products = yield index_1.prisma.product.findMany({
            where: { contractId },
            include: {
                usageData: true
            }
        });
        res.json(products);
    }
    catch (error) {
        console.error('Get contract products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getContractProducts = getContractProducts;
// Add product to contract
const addProductToContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractId } = req.params;
        const { name, quantity, unitPrice, discount, totalPrice } = req.body;
        // Check if contract exists
        const existingContract = yield index_1.prisma.contract.findUnique({
            where: { id: contractId }
        });
        if (!existingContract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        // Create product
        const product = yield index_1.prisma.product.create({
            data: {
                name,
                quantity: parseInt(quantity),
                unitPrice: parseFloat(unitPrice),
                discount: discount ? parseFloat(discount) : null,
                totalPrice: parseFloat(totalPrice),
                contractId
            }
        });
        res.status(201).json({
            message: 'Product added successfully',
            product
        });
    }
    catch (error) {
        console.error('Add product to contract error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addProductToContract = addProductToContract;
//# sourceMappingURL=contractController.js.map