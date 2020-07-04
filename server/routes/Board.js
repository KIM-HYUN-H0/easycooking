const express = require("express");
const router = express.Router();
const Content = require("../models/content");
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/resources/image/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

router.post("/recipewrite", function (req, res, next) {
  if (req.isAuthenticated()) {
    const thumb = req.body.content.match(/http([^>\"']+)/g);
    console.log(thumb[thumb.length-1]);
    const content = new Content({
      thumbnail : thumb[thumb.length-1],
      title: req.body.title,
      need: req.body.need,
      sauce: req.body.sauce,
      content: req.body.content,
      source: req.body.source,
      author: req.user.nickname,
      category: req.body.category,
    });
    content.save({}, (err) => {
      if (err) console.log(err);
      else {
        console.log("content 저장완료");
      }
    });
  } else res.status(401);
});

router.get("/recipelist", (req, res) => {
  const queryidx = req.query.idx;
  if (queryidx !== "0") {
    Content.find({ category: queryidx }, function (err, data) {
      if (err) console.error(err);
      else {
        res.json({ data: data });
      }
    });
  } else {
    Content.find({}, function (err, data) {
      if (err) console.error(err);
      else {
        res.json({ data: data });
      }
    });
  }
});
router.get("/recipedetail", (req, res) => {
  const detailidx = req.query.idx;
  if (detailidx) {
    Content.find({ idx: detailidx }, function (err, data) {
      if (err) console.error(err);
      else {
        setTimeout(function () {
          res.json({ data: data });
        }, 100);
      }
    });
  }
});
router.get("/recipedelete", (req, res) => {

  const recipeidx = req.query.idx;
  if (recipeidx) {
    Content.deleteOne({ idx: recipeidx }, function (err, data) {
      if (err) console.error(err);
      else {
        console.log("삭제완료");
      }
    });
  }
});

router.post("/recipemodify", function (req, res, next) {
  const content = new Content({
    title: req.body.title,
    need: req.body.need,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
  });
  content.save({}, (err) => {
    if (err) console.log(err);
    else {
      console.log("content 저장완료");
    }
  });
});


router.post('/imageupload',upload.single('image'), function(req,res) {
  const result = 'http://localhost:3001/image/' + (req.file.path.slice(23));
  res.json(result)
})

router.get("/view", function (req, res) {
  console.log('view')
  Content.updateOne({ idx : req.query.idx }, 
    {$inc : {view:1}}, function(err, result) {
      if(err) console.log(err);
    })
});
router.get("/like", function(req,res) {
  Content.updateOne({ idx : req.query.idx },
    {$inc : {like:1}}, function(err,result) {
      if(err) console.log(err);
      else { res.json('성공')}
    })
})

router.get("/hate", function(req,res) {
  Content.updateOne({ idx : req.query.idx },
    {$inc : {hate:1}}, function(err,result) {
      if(err) console.log(err);
      else { res.json('성공')}
    })
})

module.exports = router;
