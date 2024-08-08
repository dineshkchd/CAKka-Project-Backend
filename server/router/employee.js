const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/EmployeeController');
const middleware = require('../controllers/middleware')

router.post("/EmployeeRegister",middleware.checkToken,employeeController.EmployeeRegister)
router.post("/EmployeeLogin",employeeController.EmployeeLogin)
router.post("/EmployeeAllList",middleware.checkToken,employeeController.EmployeeAllList)


module.exports = router;
