const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  generateAssessmentReport
} = require('../controllers/assessmentController');

const router = Router();

// All assessment routes are protected
router.use(authenticate);

// Assessment routes
router.get('/', getAllAssessments);
router.get('/:id', getAssessmentById);
router.post('/', authorize(['ADMIN', 'REVIEWER']), createAssessment);
router.put('/:id', authorize(['ADMIN', 'REVIEWER']), updateAssessment);
router.delete('/:id', authorize(['ADMIN']), deleteAssessment);

// Assessment report routes
router.get('/:id/report', generateAssessmentReport);

module.exports = router;
