const express = require("express");
const router = express.Router();
const Need = require("../models/need");

router.post('/classsave', function(req,res,next) {
  const need = new Need({
    class : req.body.class
  })
  need.save((err) => {
    if(err) console.log(err);
    else { console.log('class 저장완료'); }
  })
})
router.post("/classdelete", function (req, res, next) {
  Need.deleteOne({ class: req.body.class }, (err) => {
    if (err) console.log(err);
    else {
      res.json('good')
    }
  });
});

//Need ~~~~~~~~
router.post("/needsave", function (req, res, next) {
  Need.updateOne(
    {class : req.body.class},
    {$addToSet : { need : { name : req.body.name}}},
    (err) => {
    if (err) console.log(err);
    else {
      res.json('true')
    }
  });
});


router.post("/needdelete", function (req, res, next) {
  console.log(req.body);
  Need.updateOne(
    { class: req.body.class },
    { $pull : { need : {name : req.body.name}}},
     (err) => {
    if (err) console.log(err);
    else {
      console.log("need 삭제완료");
    }
  });
});

router.get("/needlist", (req, res) => {
  Need.find({})
    .sort("class")
    .exec(function (err, data) {
      if (err) console.error(err);
      else {
        res.json({ data: data });
      }
    });
});

module.exports = router;
