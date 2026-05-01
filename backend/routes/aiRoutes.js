const express = require("express");
const { getDogRecommendation } = require("../controllers/aiController");

const router = express.Router();

router.post("/dog-recommendation", getDogRecommendation);

module.exports = router;