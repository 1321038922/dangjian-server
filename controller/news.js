const { Router } = require('express')

const router = Router()
const newsmodel = require('../model/news')
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => {
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            type,
        } = req.body;
        const news = await newsmodel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
        })
        res.json({
            code: 200,
            msg: '新建新闻成功'
        })
    } catch (err) {
        next(err)
    }
})
router.get('/', async (req, res, next) => {
    try {
        let { page = 1, pageSize = 10, id } = req.query
        page = parseInt(page)
        pageSize = parseInt(pageSize)
        if (!id) {
            let dataList = await newsmodel
                .find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort({ _id: -1 })
                .populate({
                    path: 'author',
                    select: '-password'
                })
                .populate({
                    path: 'type'
                })

            res.json({
                code: 200,
                msg: 'success',
                data:dataList
            })
        }else {
            let List = await newsmodel
                .findOne({ _id: 'id' })
                .populate({
                    path: 'admin_user',
                    select: '-password'
                })
                .populate({
                    path: 'category'
                })

            res.json({
                code: 200,
                msg: 'success',
                data:List
            })
        }

    } catch (err) {
        next(err)
    }
})

module.exports = router;