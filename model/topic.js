const mongoose = require('mongoose');
 
const topic  = new mongoose.Schema({
    commenCount:Number,
    content:{
        type:String,
        required:true
    },
    forumId:Number,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'admin_user'
    },
    common:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'topic'
        }
    ]
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt:
 'update_time'}});

 module.exports = mongoose.model('topic',topic) 