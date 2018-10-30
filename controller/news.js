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
        let { page = 1, pageSize = 10 } = req.query
        page = parseInt(page)
        pageSize = parseInt(pageSize)
        const total = await newsmodel.count()
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
            data: dataList,
            total
        })

    } catch (err) {
        next(err)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        let List = await newsmodel
            .findOne({ _id: id })
            .populate({
                path: 'admin_user',
                select: '-password'
            })
            .populate({
                path: 'category'
            })
            await List.update({$inc:{looknumber:1}})
        res.json({
            code: 200,
            msg: 'success',
            data: List
        })


    } catch (err) {
        next(err)
    }
})
router.delete('/:id', auth, async (req, res, next) => {
    try {
        let { id } = req.params
        await newsmodel.deleteOne({ _id: id })
        res.json({
            code: 200,
            msg: '删除成功'
        })

    } catch (err) {
        next(err)
    }

})

router.patch('/:id', async (req, res, next) => {
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            type,
        } = req.body;
        let { id } = req.params
        if (id) {
            const news = await newsmodel.findById(id)
            const data = await news.update({
                $set: {
                    title,
                    content,
                    contentText,
                    img,
                    author,
                    type,
                }
            })
            res.json({
                msg:'修改成功',
                code:200,
                data
            })
        } else {
            req.json({
                msg: '缺少必要参数',
                code: 400
            })
        }
    } catch (err) {
        next(err)
    }
})
module.exports = router;