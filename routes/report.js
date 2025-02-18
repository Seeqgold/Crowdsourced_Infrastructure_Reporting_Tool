const router = require('express').Router();
const reportController = require('../controller/reportController.js');

router.post('/report',reportController.createReport);
router.get('/report', reportController.getReports);
router.get('/report/severity', reportController.getReportsBySeverity);
router.put('/report/:id', reportController.updateReport);
router.delete('/report/:id', reportController.deleteReport);

module.exports = router;