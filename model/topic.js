const mongoose = require('mongoose');
 
const topic  = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    forumId:Number,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'admin_user'
    },
    commons:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'common',
        }
    ]
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt:
 'update_time'}});

 module.exports = mongoose.model('topic',topic) 