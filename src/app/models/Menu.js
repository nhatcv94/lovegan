const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete= require('mongoose-delete')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Menu = new Schema({
    name: { type: String },
    description: { type: String, maxlength: 500 },
    slug: { type: String, slug: 'name', unique: true},
    image: { type: String },
    type: {type: String},
    pride: {type: String},
},{
    timestamps: true,
});

//Add plugin
mongoose.plugin(slug);
Menu.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true})

module.exports = mongoose.model('Menu', Menu);
