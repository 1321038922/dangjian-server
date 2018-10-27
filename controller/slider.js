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
            code: 200,
            msg: '创建轮播图成功'
        })
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        let { page = 1, pageSize = 10} = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        const total = await sliderModel.count()
        let sliders = await sliderModel
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({sort: 1, _id: -1 }) 
            .populate({
                path: 'newsId'
            })
        res.json({
            code: 200,
            data: sliders,
            msg: 'success',
            total
        })
    } catch (err) {
        next(err)
    }
})
router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        let slider = await sliderModel
            .findOne({ _id: id })
            .populate({
                path: 'newsId'
            })
        res.json({
            code: 200,
            msg: 'success',
            data: slider
        })
    } catch (err) {
        next(err)
    }
})

router.patch('/:id', async (req, res, next) => {

    try {
        let { id } = req.params
        const {
            img,
            title,
            newsId,
            sort,
            status,
        } = req.body
        const data = await sliderModel.findById(id)
        const updateData = await data.update({
            $set: {
                img,
                title,
                newsId,
                sort,
                status,
            }
        })
        res.json({
            code: 200,
            msg: '修改成功',
            data: updateData
        })
    } catch (err) {
        next(err)
    }
})
router.delete('/:id', auth, async (req, res, next) => {
    try {
        let { id } = req.params
        await sliderModel.deleteOne({ _id: id })
        res.json({
            code: 200,
            msg: '删除成功'
        })

    } catch (err) {
        next(err)
    }

})
module.exports = router