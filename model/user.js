const mongoose = require('mongoose');
 
const adminUser  = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique:true
    },
    avatar: String,
    password:{
        type:String,
        required: true
    },
    hometown:String,
    nickname:Number,
    idCard:Number,
    address:String,
    branchName:Number,
    joinPartyTime:String,
    lastPayTime:String,
    branchName:String,
    birthday:String,
    phone:Number,
    sex: Number,
    salary: Number,
    qqNum: Number,
    vxNum: Number,
    age: Number,
    jobRank:String,//学历
    nation:String,
    totalScore:Number
},{versionKey: false, timestamps: {createdAt: 'create_time', updatedAt:
 'update_time'}});

 module.exports = mongoose.model('admin_user',adminUser) 