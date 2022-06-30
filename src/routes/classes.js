const router = require('express').Router();
const classController = require('../controller/ClassController');

router.post('/add', classController.addNewClass);
router.get('/:id', classController.getClass);

module.exports = router;