const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));
router.use("/errors", require("./errors"));

module.exports = router;
