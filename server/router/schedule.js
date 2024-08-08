const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/Schedule');

router.get('/booked-slots', scheduleController.getBookedSlots);
router.post('/bookSlot', scheduleController.bookSlot);


module.exports = router
