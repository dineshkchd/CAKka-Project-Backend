var express = require ('express')
var router = express.Router();

const customerController = require('../controllers/Customer')

router.post('/customer_register',customerController.customerRegister)
router.post('/verifyOTp',customerController.verifyOTp)
router.post('/contactUs',customerController.contactUs)


module.exports= router