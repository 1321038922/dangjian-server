const mongoose = require('mongoose');
 
const slider  = new mongoose.Schema({
    title:String,
    img:String,
    sort: {
        type:Number,
        default:999999
    },
    newsId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'news'
    },
    status:{
        type:Number,
        default:0
    },

},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt:
 'update_time'}});

 module.exports = mongoose.model('slider',slider) 