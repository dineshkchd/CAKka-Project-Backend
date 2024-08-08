const express = require('express');

const router = express.Router();

const managerController = require('../controllers/ManagerController');
const middleware = require('../controllers/middleware')

router.post("/ManagerRegister",middleware.checkToken,managerController.ManagerRegister)
router.post("/ManagerLogin",managerController.ManagerLogin)
router.post("/ChangePassword",middleware.checkToken,managerController.ChangePassword)

module.exports = router;
