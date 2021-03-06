//Import Module
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const passport = require("passport");
const User = require("./models/user");
const cookieParser = require('cookie-parser');
//Import Custom

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,    
}));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie : { maxAge : 1000 * 60 * 30 } }));


app.use(passport.initialize()); // passport 초기화
app.use(passport.session());  

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static('server/resources'))                 //정적파일 저장
app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended: false }));
//server End

//module

//module End
const Sauce = require('./routes/Sauce');
const Users = require('./routes/Users');
const Board = require('./routes/Board');
const Category = require('./routes/Category');
const Need = require('./routes/Need');
const Search = require('./routes/Search');

// DB
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
db.on('error', console.error);
db.once('open', function(){ 
    console.log('connected mongodb server ! ');
});
mongoose.connect('mongodb://localhost/easycooking')



app.use('/sauce', Sauce);
app.use('/users', Users);
app.use('/board', Board);
app.use('/need', Need);
app.use('/category', Category);
app.use('/search', Search);
//DB End


//Process


app.listen(port, () => {
    console.log('express 서버 실행 ');
})