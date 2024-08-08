var express = require ('express')
var router = express.Router();


const navItemController = require('../controllers/NavItem')

router.post('/navitemAdd',navItemController.navitemAdd)
router.post('/getnavitem',navItemController.getNavItem)


module.exports= router