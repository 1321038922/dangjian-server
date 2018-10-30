const { Router } = require('express')

const router = Router()
const categorymodel = require('../model/category')
const auth = require('./auth')

router.get('/',async (req,res, next) =>{
    try {
        const total = await categorymodel.count()
        const dataList = await categorymodel.find()
        res.json({
            code:200,
            data:dataList,
            msg:'success',
            total
        })
    }catch(err) {
        next(err)
    }
})
router.post('/', async (req,res, next)=> {
    try{
        let {title,icon} = req.body
        const category = await categorymodel.create({
            title,
            icon
        })
        res.json({
            code: 200,
            msg: '新建分类成功'
        })
    }catch(err){
        next(err)
    }
})
module.exports = router