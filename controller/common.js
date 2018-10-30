const { Router } = require('express')

const router = Router()
const commonModel = require('../model/common')
const topicModel = require('../model/topic')
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => {
    try {
        const {
            content,
            topic_id,
        } = req.body;
        const userId = req.session.user._id;
        const topic = await topicModel.findById(topic_id)//查找主题
         
        if (topic) {
            common = await commonModel.create({content,user:userId,topic:topic_id})
            await topic.update({$set:{common:common._id}})
            // await topic.save
            res.json({
                code: 200,
                data: common,
                msg: 'success'
            })
        }else{
            res.json({
                code:400,
                msg:"没有该主题"
            })
        }
        
    } catch (err) {
        next(err)
    }
})

router.get('/',async (req,res, next)=> {
    try{
        let { page = 1, pageSize = 10} = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        const count = await commonModel.count()
        const data = await commonModel
        .find()
        .skip((page - 1)*pageSize)
        .limit(pageSize)
        .sort({_id:-1})
        .populate({
            path:'user',
            select:'nickname avatar'
        })
        .populate({
            path:'topic'
        })

        res.json({
            code:200,
            msg:'success',
            count,
            data
        })
    }catch(err){
        next(err)
    }
})

module.exports = router