const express = require("express");
const Category = require("../models/category");
const Content = require("../models/content");
const Need = require("../models/need");
const Sauce = require("../models/sauce");
const User = require("../models/user");
const passport = require("passport");
const multer = require('multer');
const path = require('path');

const router = express.Router();
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

// Category js 시작
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
//Category js 종료

//recipe.js 시작

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
//recipe 끝
//need 시작
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
//Need end ~~~~~~

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
//Sauce end ~~~~~

//Search
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

router.get("/needsearch", (req, res) => {
  console.log("실행");
  Content.find({ need: { $all: req.query.data } }, function (err, data) {
    if (err) console.error(err);
    else {
      res.json({ data: data });
    }
  });
});

// Users

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json("zz");
});

router.post("/signup", function (req, res) {
  if (req.body.password !== req.body.password2) {
    res.json("패스워드를 확인해주세요.");
  } 
  else if(0) {
    res.json('아이디가 이미 존재합니다.')
  }
  else if(0) {
    res.json('닉네임이 이미 존재합니다.')
  }
  else {
    User.register(
      new User({ username: req.body.username, nickname: req.body.nickname }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
        }
        else {
          res.json(200);
        }
      }
    );
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.json("로그아웃");
});

router.get("/logincheck", function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user.nickname);
  } else {
    res.json(false);
  }
});

//board control
router.post('/imageupload',upload.single('image'), function(req,res) {
  const result = 'http://localhost:3001/image/' + (req.file.path.slice(23));
  res.json(result)
})

router.get("/view", function (req, res) {
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


router.get('/test', function(req,res) {
  const a = '<p>ㄹㄹㄹ<img src=\"http://localhost:3001/image/1591459015102.jpg\" alt=\"alt text\"><img src=\"http://localhost:3001/image/1591459019655.jpg\" alt=\"alt text\"></p>\n';
  const b = a.match(/[\"']?([^>\"']+)[\"']?[^>]*>/g);
  const c = a.match(/http([^>\"']+)/g)
  res.json(c);
})
module.exports = router;
