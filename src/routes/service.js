const router = require('express').Router();
const serviceController = require('../controller/ServiceController');

router.get('/:id', serviceController.getService);
router.post('/start', serviceController.startService);
router.put('/stop', serviceController.stopService);
router.put('/restart', serviceController.restartService);

module.exports = router;