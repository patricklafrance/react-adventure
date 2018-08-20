const express = require("express");
const data = require("../data.js");
const _ = require("lodash");

const router = express.Router();

router.get("/", (_, res) => {
  res.json({
    products: data.products
  });
});

router.get("/count", (_, res) => {
  res.json({
    count: data.products.length
  });
});

router.get("/:productId", (req, res) => {
  const product = data.products.find(
    x => x.id === parseInt(req.params.productId)
  );

  if (_.isNil(product)) {
    res.sendStatus(400);
  } else {
    res.json(product);
  }
});

router.post("/new", (req, res) => {
  const { name, brand, categories, merchantId } = req.body;

  const product = {
    id: data.products.length,
    name,
    brand,
    categories,
    merchantId,
    voteCount: 0
  };

  data.products.push(product);

  res.sendStatus(200);
});

router.post("/upvote", (req, res) => {
  const product = data.products.find(x => x.id === req.body.productId);

  if (_.isNil(product)) {
    res.sendStatus(400);
  } else {
    product.voteCount += 1;
    res.sendStatus(200);
  }
});

module.exports = router;
