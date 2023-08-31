const express = require("express");
const router = express.Router();
const aboutUsController = require("../controllers/aboutUsController");


router.get("/api/aboutUs", aboutUsController.aboutUs);
router.put("/api/aboutUs/:id", aboutUsController.updateAboutUs);

module.exports = router;