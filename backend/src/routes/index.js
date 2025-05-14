const { Router } = require('express');
const userRoutes = require('./userRoutes');
const contractRoutes = require('./contractRoutes');
const assessmentRoutes = require('./assessmentRoutes');

const router = Router();

router.use('/users', userRoutes);
router.use('/contracts', contractRoutes);
router.use('/assessments', assessmentRoutes);

module.exports = router;
