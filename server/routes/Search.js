const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.get("/needsearch", (req, res) => {
  console.log("실행");
  Content.find({ need: { $all: req.query.data } }, function (err, data) {
    if (err) console.error(err);
    else {
      res.json({ data: data });
    }
  });
});

router.get("/titlesearch", (req, res) => {
  console.log("실행");
  const searchtitle = ".*" + req.query.name + ".*";

  Content.find({ title: { $regex: searchtitle } }, function (err, data) {
    if (err) console.error(err);
    else {
      res.json({ data: data });
    }
  });
});

module.exports = router;
