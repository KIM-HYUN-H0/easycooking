const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/categorylist", (req, res) => {
  Category.find({}, function (err, data) {
    if (err) console.error(err);
    else {
      res.json({ data: data });
    }
  });
});
router.post("/categorysave", function (req, res, next) {
  const category = new Category({
    name: req.body.name,
  });
  category.save((err) => {
    if (err) console.log(err);
    else {
      res.json('good')
    }
  });
});
router.post("/categorydelete", function (req, res, next) {
  Category.deleteOne({ name: req.body.name }, (err) => {
    if (err) console.log(err);
    else {
      res.json('good')
    }
  });
});
router.get('/categorycheck', function(req,res) {
  Category.find({number : req.query.idx}, (err,data) => {
    res.json({data : data[0].name})
  })
})

module.exports = router;
