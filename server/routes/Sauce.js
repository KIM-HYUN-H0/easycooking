const express = require("express");
const router = express.Router();
const Sauce = require("../models/sauce");


// Sauce ~~~~~
router.post("/saucesave", function (req, res, next) {
  const sauce = new Sauce({ name : req.body.sauce });
  sauce.save(
    (err) => {
    if (err) console.log(err);
    else {
      res.json('true')
    }
  });
});

router.post("/saucedelete", function (req, res, next) {
  Sauce.deleteOne(
    { name : req.body.sauce },
     (err) => {
    if (err) console.log(err);
    else {
      res.json('delete ok')
    }
  });
});

router.get("/saucelist", (req, res) => {
  Sauce.find({}, (err, data) => {
      if (err) console.error(err);
      else {
        res.json({ data: data });
      }
    });
});

module.exports = router;
