const mongoose = require('mongoose');
const mongooseDelete= require('mongoose-delete')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Customer = new Schema({
    name: { type: String },
    text: { type: String, maxlength: 500 },
    position: { type: String},
},{
    timestamps: true,
});

//Add plugin
Customer.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true})
module.exports = mongoose.model('Customer', Customer);
