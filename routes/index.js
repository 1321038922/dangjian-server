var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/adminUser', require('../controller/adminUser'))
router.use('/admin/news', require('../controller/news'))
router.use('/admin/category', require('../controller/category'))
router.use('/admin/slider', require('../controller/slider'))
router.use('/admin/topic', require('../controller/topic'))
router.use('/admin/common', require('../controller/common'))



//jwt  Demo
const adminUserModel = require('../model/adminUser')
const jwt = require('jsonwebtoken')
const cert = require('../utils/auth')
const newsModel = require('../model/news')
router.post('/demo/login', async (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    const user = await adminUserModel.findOne({ username })
    if (user) {
        if (user.password == password) {
            const token = jwt.sign({ userId: user._id }, cert, { expiresIn: 60 * 60 * 7 })

            res.json({
                code: 200,
                token,
                msg: '登陆成功',
                data: user
            })
        } else {
            res.json({
                code: 400,
                msg: '密码错误'
            })
        }
    } else {
        res.json({
            code: 400,
            msg: '该用户不存在'
        })
    }
})

router.get('/demo/getNews1', async (req, res, next) => {
    const dataList = await newsModel.find()
    res.json({
        code: 200,
        msg: 'success',
        data: dataList
    })
})
router.get('/demo/getNews2', (req, res, next) => {
    let token = req.headers.token || req.body.token || req.query.token
    if (token) {
        jwt.verify(token, cert, function (err, decode) {
            if (err) {
                res.json({
                    code: 403,
                    msg: '登录状态失效',
                })
                return
            }
            adminUserModel.findOne({ id: decode.userId }).then(user => {
                newsModel.find().then(data => {
                    res.json({
                        data: {
                            news: data,
                            user: user
                        },
                        code: 200,
                    })
                })
            })
        })
    } else {
        res.json({
            code: 403,
            msg: '缺少token'
        })
    }
})

module.exports = router;
