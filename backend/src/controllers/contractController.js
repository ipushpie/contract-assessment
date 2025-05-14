const { PrismaClient } = require("@prisma/client");

// Initialize Prisma client directly in this file to avoid circular dependencies
const prisma = new PrismaClient();

// Get all contracts
const getAllContracts = async (req, res) => {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        products: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(contracts);
  } catch (error) {
    console.error("Get all contracts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get contract by ID
const getContractById = async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await prisma.contract.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            usageData: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assessments: true,
      },
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.json(contract);
  } catch (error) {
    console.error("Get contract by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create contract
const createContract = async (req, res) => {
  try {
    const {
      name,
      vendorName,
      contractNumber,
      startDate,
      endDate,
      annualValue,
      totalValue,
      duration,
      terminationNotice,
      autoRenewal,
      customerDefinition,
      geographicLimits,
      auditObligations,
      documentUrl,
      products,
    } = req.body;

    const contract = await prisma.contract.create({
      data: {
        name,
        vendorName,
        contractNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        annualValue: parseFloat(annualValue),
        totalValue: parseFloat(totalValue),
        duration: parseInt(duration),
        terminationNotice: terminationNotice
          ? parseInt(terminationNotice)
          : null,
        autoRenewal: Boolean(autoRenewal),
        customerDefinition,
        geographicLimits,
        auditObligations,
        documentUrl,
        createdById: req.user.id,
        products: {
          create:
            products?.map((product) => ({
              name: product.name,
              quantity: parseInt(product.quantity),
              unitPrice: parseFloat(product.unitPrice),
              discount: product.discount ? parseFloat(product.discount) : null,
              totalPrice: parseFloat(product.totalPrice),
            })) || [],
        },
      },
      include: {
        products: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Contract created successfully",
      contract,
    });
  } catch (error) {
    console.error("Create contract error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update contract
const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      vendorName,
      contractNumber,
      startDate,
      endDate,
      annualValue,
      totalValue,
      duration,
      terminationNotice,
      autoRenewal,
      customerDefinition,
      geographicLimits,
      auditObligations,
      documentUrl,
    } = req.body;

    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id },
    });

    if (!existingContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Update contract
    const updatedContract = await prisma.contract.update({
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
        terminationNotice: terminationNotice
          ? parseInt(terminationNotice)
          : null,
        autoRenewal:
          autoRenewal !== undefined ? Boolean(autoRenewal) : undefined,
        customerDefinition,
        geographicLimits,
        auditObligations,
        documentUrl,
      },
      include: {
        products: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      message: "Contract updated successfully",
      contract: updatedContract,
    });
  } catch (error) {
    console.error("Update contract error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete contract
const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id },
    });

    if (!existingContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Delete contract
    await prisma.contract.delete({
      where: { id },
    });

    res.json({ message: "Contract deleted successfully" });
  } catch (error) {
    console.error("Delete contract error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products for a contract
const getContractProducts = async (req, res) => {
  try {
    const { contractId } = req.params;

    const products = await prisma.product.findMany({
      where: { contractId },
      include: {
        usageData: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Get contract products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product to contract
const addProductToContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { name, quantity, unitPrice, discount, totalPrice } = req.body;

    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!existingContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        quantity: parseInt(quantity),
        unitPrice: parseFloat(unitPrice),
        discount: discount ? parseFloat(discount) : null,
        totalPrice: parseFloat(totalPrice),
        contractId,
      },
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product to contract error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  getContractProducts,
  addProductToContract,
};
