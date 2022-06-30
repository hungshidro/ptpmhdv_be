const router = require('express').Router();
const studentController = require('../controller/StudentController');

router.post('/add', studentController.addNewStudent);
router.get('/:id',studentController.getStudent);
router.put('/update',studentController.updateStudent);
router.post('/login',studentController.validateStudent);
router.get('/getAllService/:id', studentController.getAllServiceOfStudent)

module.exports = router;