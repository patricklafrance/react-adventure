const express = require("express");
const data = require("./data.js");

const router = express.Router();

router.get("/products", (_, res) => {
  res.json({
    data: data.products
  });
});

router.post("/products/upvote", (req, res) => {
  console.dir("Request body:", req.body);

  res.sendStatus(200);
});

module.exports = router;
