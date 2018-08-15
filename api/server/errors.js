const express = require("express");

const router = express.Router();

router.get("/400", (req, res) => {
  res.status(400).json({
    errorCodes: ["INVALID_PRODUCT"]
  });
});

router.get("/401", (req, res) => {
  res.setStatus(401);
  res.send("Unauthorized access!");
});

router.get("/409", (req, res) => {
  res.status(409).send("Conflict!");
});

router.get("/500", (_, res) => {
  res.status(500).send("BOUM, unmanaged error!");
});

router.get("/empty-body", (_, res) => {
  res.json();
});

module.exports = router;
