const mongoose = require('mongoose');
const mongooseDelete= require('mongoose-delete')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookATable = new Schema({
    name: { type: String},
    email: { type: String, required:true},
    phone: { type: String},
    time: { type: String},
    person: { type: String},
},{
    timestamps: true,
});

//Add plugin
BookATable.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true})
module.exports = mongoose.model('BookATable', BookATable);
