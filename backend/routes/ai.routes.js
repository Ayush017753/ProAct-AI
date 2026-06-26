const express = require("express");

const router = express.Router();

const {
    breakdownTaskController
} = require("../controllers/ai.controller");

router.post(
    "/breakdown-task",
    breakdownTaskController
);

module.exports = router;