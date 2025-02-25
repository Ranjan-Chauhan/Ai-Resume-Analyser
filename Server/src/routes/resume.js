const express = require("express");
const upload = require("../middlewares/multer");
const { analyzeResume } = require("../controllers/resumeController");

const router = express.Router();

router.post("/upload", upload.single("file"), analyzeResume);

module.exports = router;
