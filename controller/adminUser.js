const { Router } = require('express')

const router = Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => {//添加管理员
    try {
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        } = req.body
        const data = await adminUserModel.create({
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        })

        res.json({
            code: 200,
            data,
            msg: '新建用户成功'
        })
    } catch (err) {
        next(err)
    }
})
router.post('/login', async (req, res, next) => {//登录
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await adminUserModel.findOne({ username })
            const data = await adminUserModel.findOne({ username }, { password: 0 })
            if (user) {
                if (password == user.password) {
                    req.session.user = user //将用户的信息存进session
                    res.json({
                        code: 200,
                        msg: '登陆成功',
                        data
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    code: 401,
                    msg: '用户不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少参数'
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/update',auth, (req, res, next) => {
    try {
        if (req.session.user) {
            req.session.user = null
            res.json({
                code: 200,
                msg: '退出成功'
            })
        } else {
            res.json({
                code: 403,
                msg: '用户未登录'
            })
        }
    } catch (err) {
        next(err)
    }
})
router.get('/', auth, async (req, res, next) => {
    try {
        let { page = 1, pagesize = 10, id } = req.query;
        page = parseInt(page)
        pagesize = parseInt(pagesize)
        if (!id) {
            let user = await adminUserModel.find().skip((page - 1) * pagesize).limit(pagesize).sort({ _id: -1 }).select("-password")
                .then(data => {
                    res.json({
                        data,
                        code: 200,
                        msg: 'success'
                    })
                })
        } else {
            await adminUserModel.findOne({ _id: 'id' }).then(data => {
                res.json({
                    data,
                    code: 200,
                    msg: 'success'
                })
            })
        }
    } catch (err) {
        next(err)
    }

})

module.exports = router