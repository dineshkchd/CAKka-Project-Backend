const express = require('express');

const router = express.Router();

const middleware = require('../controllers/middleware')
const taskController = require('../controllers/TaskController')

router.post("/AddTask",middleware.checkToken,taskController.AddTask)
router.post("/getTasks",middleware.checkToken,taskController.getTasks)
router.post("/AllGetTasks",middleware.checkToken,taskController.AllGetTasks)
router.post("/TaskStatusChange",middleware.checkToken,taskController.TaskStatusChange)

module.exports = router;