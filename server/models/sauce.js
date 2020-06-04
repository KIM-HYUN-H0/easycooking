const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const sauceSchema = new Schema({
    name : { type : String, unique : true},
}, {
    versionKey : false,
});

module.exports = mongoose.model('Sauce', sauceSchema);
