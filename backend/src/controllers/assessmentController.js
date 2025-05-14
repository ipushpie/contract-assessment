const { PrismaClient } = require("@prisma/client");

// Initialize Prisma client directly in this file to avoid circular dependencies
const prisma = new PrismaClient();

// Get all assessments
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        contract: {
          select: {
            id: true,
            name: true,
            vendorName: true,
            endDate: true,
          },
        },
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(assessments);
  } catch (error) {
    console.error("Get all assessments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        contract: {
          include: {
            products: {
              include: {
                usageData: true,
              },
            },
          },
        },
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.json(assessment);
  } catch (error) {
    console.error("Get assessment by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create assessment
const createAssessment = async (req, res) => {
  try {
    const {
      contractId,
      volumeChangeForecasts,
      additionalProducts,
      redundantProducts,
      downgradePotential,
      preferredContractLength,
      paymentFlexibility,
      vendorSwitchWillingness,
      satisfactionRating,
      impactRating,
      isNicheVendor,
      recommendations,
      status,
    } = req.body;

    // Check if contract exists
    const existingContract = await prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!existingContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Create assessment
    const assessment = await prisma.assessment.create({
      data: {
        contractId,
        assessorId: req.user.id,
        volumeChangeForecasts,
        additionalProducts,
        redundantProducts,
        downgradePotential,
        preferredContractLength: preferredContractLength
          ? parseInt(preferredContractLength)
          : null,
        paymentFlexibility: Boolean(paymentFlexibility),
        vendorSwitchWillingness: Boolean(vendorSwitchWillingness),
        satisfactionRating: satisfactionRating
          ? parseInt(satisfactionRating)
          : null,
        impactRating: impactRating ? parseInt(impactRating) : null,
        isNicheVendor: Boolean(isNicheVendor),
        recommendations,
        status: status || "IN_PROGRESS",
      },
      include: {
        contract: {
          select: {
            id: true,
            name: true,
            vendorName: true,
          },
        },
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Assessment created successfully",
      assessment,
    });
  } catch (error) {
    console.error("Create assessment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update assessment
const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      volumeChangeForecasts,
      additionalProducts,
      redundantProducts,
      downgradePotential,
      preferredContractLength,
      paymentFlexibility,
      vendorSwitchWillingness,
      satisfactionRating,
      impactRating,
      isNicheVendor,
      recommendations,
      status,
    } = req.body;

    // Check if assessment exists
    const existingAssessment = await prisma.assessment.findUnique({
      where: { id },
    });

    if (!existingAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Update assessment
    const updatedAssessment = await db.prisma.assessment.update({
      where: { id },
      data: {
        volumeChangeForecasts,
        additionalProducts,
        redundantProducts,
        downgradePotential,
        preferredContractLength: preferredContractLength
          ? parseInt(preferredContractLength)
          : null,
        paymentFlexibility:
          paymentFlexibility !== undefined
            ? Boolean(paymentFlexibility)
            : undefined,
        vendorSwitchWillingness:
          vendorSwitchWillingness !== undefined
            ? Boolean(vendorSwitchWillingness)
            : undefined,
        satisfactionRating: satisfactionRating
          ? parseInt(satisfactionRating)
          : null,
        impactRating: impactRating ? parseInt(impactRating) : null,
        isNicheVendor:
          isNicheVendor !== undefined ? Boolean(isNicheVendor) : undefined,
        recommendations,
        status,
      },
      include: {
        contract: {
          select: {
            id: true,
            name: true,
            vendorName: true,
          },
        },
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      message: "Assessment updated successfully",
      assessment: updatedAssessment,
    });
  } catch (error) {
    console.error("Update assessment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete assessment
const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if assessment exists
    const existingAssessment = await db.prisma.assessment.findUnique({
      where: { id },
    });

    if (!existingAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Delete assessment
    await db.prisma.assessment.delete({
      where: { id },
    });

    res.json({ message: "Assessment deleted successfully" });
  } catch (error) {
    console.error("Delete assessment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Generate assessment report
const generateAssessmentReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Get assessment with all related data
    const assessment = await db.prisma.assessment.findUnique({
      where: { id },
      include: {
        contract: {
          include: {
            products: {
              include: {
                usageData: true,
              },
            },
          },
        },
        assessor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Generate report data
    const report = {
      assessmentId: assessment.id,
      contractDetails: {
        name: assessment.contract.name,
        vendor: assessment.contract.vendorName,
        startDate: assessment.contract.startDate,
        endDate: assessment.contract.endDate,
        annualValue: assessment.contract.annualValue,
        totalValue: assessment.contract.totalValue,
        autoRenewal: assessment.contract.autoRenewal,
        terminationNotice: assessment.contract.terminationNotice,
      },
      products: assessment.contract.products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        totalPrice: product.totalPrice,
        usage: product.usageData
          ? {
              activeUserPercent: product.usageData.activeUserPercent,
              featureUtilization: product.usageData.featureUtilization,
              usageFrequency: product.usageData.usageFrequency,
            }
          : null,
      })),
      assessment: {
        volumeChangeForecasts: assessment.volumeChangeForecasts,
        additionalProducts: assessment.additionalProducts,
        redundantProducts: assessment.redundantProducts,
        downgradePotential: assessment.downgradePotential,
        preferredContractLength: assessment.preferredContractLength,
        paymentFlexibility: assessment.paymentFlexibility,
        vendorSwitchWillingness: assessment.vendorSwitchWillingness,
        satisfactionRating: assessment.satisfactionRating,
        impactRating: assessment.impactRating,
        isNicheVendor: assessment.isNicheVendor,
      },
      recommendations: assessment.recommendations,
      assessor: assessment.assessor.name,
      generatedAt: new Date(),
    };

    res.json(report);
  } catch (error) {
    console.error("Generate assessment report error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  generateAssessmentReport,
};
