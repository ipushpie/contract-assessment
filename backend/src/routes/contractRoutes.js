const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  getContractProducts,
  addProductToContract
} = require('../controllers/contractController');

const router = Router();

// All contract routes are protected
router.use(authenticate);

// Contract routes
router.get('/', getAllContracts);
router.get('/:id', getContractById);
router.post('/', authorize(['ADMIN', 'REVIEWER']), createContract);
router.put('/:id', authorize(['ADMIN', 'REVIEWER']), updateContract);
router.delete('/:id', authorize(['ADMIN']), deleteContract);

// Product routes
router.get('/:contractId/products', getContractProducts);
router.post(
  '/:contractId/products',
  authorize(['ADMIN', 'REVIEWER']),
  addProductToContract
);

module.exports = router;
