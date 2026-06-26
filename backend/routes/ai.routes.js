const express = require("express");

const router = express.Router();

const {
    breakdownTaskController , 
    getAllTasksController
} = require("../controllers/ai.controller");

router.post(
    "/breakdown-task",
    breakdownTaskController
);

/// added
router.get(
    "/tasks",
    getAllTasksController
);
//

module.exports = router;