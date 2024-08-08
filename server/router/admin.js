const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const middleware = require("../controllers/middleware")


router.post("/register",adminController.register)
router.post ("/login",middleware.emailIdRequired,adminController.login)




module.exports = router;