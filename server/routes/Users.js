const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json("Login Success.");
});

router.post("/signup", function (req, res) {
  if (req.body.password !== req.body.password2) {
    res.json("패스워드를 확인해주세요.");
  } else if (0) {
    res.json("아이디가 이미 존재합니다.");
  } else if (0) {
    res.json("닉네임이 이미 존재합니다.");
  } else {
    User.register(
      new User({ username: req.body.username, nickname: req.body.nickname }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          res.json(200);
        }
      }
    );
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  res.json("Logout Success");
});

router.get("/logincheck", function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user.nickname);
  } else {
    res.status(401).send();
  }
});

router.post("/saveneed", function (req, res) {  
  if (req.isAuthenticated()) {
    User.updateOne(
      { nickname: req.user.nickname },
      { $set: { havingneed: req.body.need } },
      (err) => {
        if (err) console.log(err);
        else {
          res.json("true");
        }
      }
    );
  } else {
    res.json(false);
  }
});

router.get("/loadneed", function (req, res) {  
  if(req.isAuthenticated()) {
    User.find({nickname : req.user.nickname}
    , (err, result) => {
      if(err) console.log(err);
      else {
        res.json(result[0].havingneed)
      }
    })

  }
  else {
    User.find({nickname : "나에요"}
      , (err, result) => {
        if(err) console.log(err);
        else {
          res.json(result[0].havingneed)
        }
      })

    //res.json([]);
  }
  /*
  if (req.isAuthenticated()) {
    User.find({nickname : req.user.nickname}
      , (err, result) => {
        if(err) console.log(err);
        else {
          console.log(result);
          res.json(result)
        }
      })
  } else {
    res.json(false);
  }
  */
});


module.exports = router;
