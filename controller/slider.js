const { Router } = require('express')

const router = Router()
const sliderModel = require('../model/slider')
const auth = require('./auth')

router.post('/', auth, async (req, res, nest) => {
    try {
        let {
            title,
            img,
            sort,
            newsId,
            status,
        } = req.body
        const slider = await sliderModel.create({
            title,
            img,
            sort,
            newsId,
            status,
        })
        res.json({
            code:200,
            msg:'创建轮播图成功'
        })
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) =>{
    try{
        let {page = 1, pageSize = 10, id} =req.body;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        if(id){
         let slider = await  sliderModel.findOne({_id:'id'})
          res.json({
              code:200,
              msg:'success',
              data: slider
          })
        }else {
            let sliders = await  sliderModel
            .find()
            .skip((page - 1)* pageSize)
            .limit(pageSize)
            .sort({_id:-1}) 
            res.json({
                code:200,
                data:sliders,
                msg:'success'
            })
        }
    }catch(err){
        next(err )
    }
})
module.exports = router