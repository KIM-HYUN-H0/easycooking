const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const needSchema = new Schema({
    class : { type : String, unique : true},
    need : [Schema({ name : { type : String, unique : true }}, { _id: false })]
}, {
    versionKey : false,
});

module.exports = mongoose.model('Need', needSchema);
