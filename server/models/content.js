const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const likeSchema = new Schema({
    like : {type : Number, default : 0},
    liker : { type : [String]}
})
const hateSchema = new Schema({
    hate : {type : Number, default : 0},
    hater : { type : [String]}
})

const commentSchema = new  Schema({
    idx : { type : Number },
    content : {},
    author : {},
    comment_date : {type : Date, default : Date.now()},
    like : {likeSchema},
    hate : {hateSchema}
    //좋아요 싫어요 기능 추가 !!
});


const contentSchema = new Schema({
    idx : {type : Number,},
    title : { type : String,},
    need : { type : [String]},
    sauce : { type : [String]},
    content : { type : String },
    source : { type : String },
    author : { type : String },
    category : { type : String },
    board_date : { type : Date, default : Date.now()},
    view : {type : Number , default : 0 },
    like : {type : Number ,default : 0 },
    hate : {type : Number ,default : 0 },
    comment : [commentSchema]
    //좋아요 실헝요 기능 추가 !!
    
}, {
    versionKey : false
});

contentSchema.plugin( autoIncrement.plugin , { model : 'contentmodel' , field : 'idx' , startAt : 1 , increment : 1});
contentSchema.plugin( autoIncrement.plugin , { model : 'commentmodel' , field : 'idx' , startAt : 1 , increment : 1});
module.exports = mongoose.model('content', contentSchema);
