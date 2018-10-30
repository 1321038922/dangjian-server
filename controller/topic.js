const { Router } = require('express')

const router = Router()
const topicModle = require('../model/topic')
const commonModel = require('../model/common')
const auth = require('./auth')

router.post('/', auth,async (req,res, next)=>{
    try{
        const {content} = req.body;
        const userId = req.session.user._id
        const topic = await topicModle.create({
            user:userId,
            content
        })
        res.json({
            code:200,
            msg:'success',
            data:topic
        })
    }catch(err){
        next(err)
    }
})

router.get('/',async (req,res,next) =>{
    try{
        let { page = 1, pageSize = 10} = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        const count = await topicModle.count()
        const dataList= await topicModle
        .find()
        .skip((page - 1)*pageSize)
        .limit(pageSize)
        .sort({_id:-1})
        .populate({
            path:'user',
            select:'nickname avatar',
        }).populate({
            path:'commons',
        })
        res.json({
            code:200,
            msg:'success',
            data:dataList,
            count
        })
    }catch(err){
        next(err)
    }
})
router.get('/getCommon/:topicId',async (req,res,next) =>{
    try{
        const {topicId} = req.params
        const dataList= await commonModel
        .find({topic:topicId})
        .populate({
            path:'user',
            select:'nickname avatar',  
        })
        res.json({
            code:200,
            msg:'success',
            data:dataList,
        })
    }catch(err){
        next(err)
    }
})

module.exports = router 