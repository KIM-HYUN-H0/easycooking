const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const categorySchema = new Schema({
    name : { type : String, unique : true },
    number : { type : Number, unique : true }
}, {
    versionKey : false
});
categorySchema.plugin( autoIncrement.plugin , { model : 'schemamodel' , field : 'number' , startAt : 1 , increment : 1});

module.exports = mongoose.model('category', categorySchema);
