const { Router } = require('express')

const router = Router()
const categorymodel = require('../model/category')
const auth = require('./auth')

router.get('/',async (req,res, next) =>{
    try {
        const dataList = await categorymodel.find()
        res.json({
            code:200,
            data:dataList,
            msg:'success'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router